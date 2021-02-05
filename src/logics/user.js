import Logic from "./logic";
import { UserRepository } from "../repos/user";
import { sign, generateTokenRefresh, generateHash, generateTokenResetPassword, verifyTokenResetPassword } from "./utils/security/security";
import { throwError } from "./utils/error/errorManager";
import EmailSingleton from "./utils/nodemailer/emailFunctions";
import TemplateSingleton from "./utils/nodemailer/templates";
require('dotenv').config();

export default class UserLogic extends Logic {
    constructor(params) {
        super(params, {
            db: UserRepository,
            child: []
        });
        this.params = params;
    }

    async register() {
        try {
            let user = await UserRepository.findUserByEmail({ email: this.params.email });
            if (user) {
                throwError("EMAIL_ALREADY_REGISTERED");
            }
            await EmailSingleton.sendEmail({
                from: process.env.EMAIL_FROM,
                to: this.params.email,
                subject: 'Obrigado Por Se Registrar!',
                html: TemplateSingleton.registerUser({ email: this.params.email })
            })
            return await this.save({
                password: generateHash(this.params.password)
            });
        } catch (err) {
            throw err;
        }
    }

    async login() {
        try {
            if (this.params.email == undefined || this.params.password == undefined) {
                throwError("ERROR_LOGIN_OR_PASSWORD");
            }
            let res = await UserRepository.login({ email: this.params.email, password: generateHash(this.params.password) });
            if (!res) {
                throwError("ERROR_LOGIN_OR_PASSWORD");
            }
            let tokens = { tokenAccess: sign(res._id), tokenRefresh: generateTokenRefresh() };
            await UserRepository.setTokens(res._id, tokens);

            return tokens;
        } catch (err) {
            throw err;
        }
    }

    async token() {
        try {
            let user = await UserRepository.getByTokenRefresh({ tokenRefresh: this.params.tokenRefresh });
            if (!user) {
                throwError("TOKEN_INVALID");
            }
            let tokens = { tokenAccess: sign(user._id), tokenRefresh: user.tokenRefresh };
            await UserRepository.setTokens(user._id, tokens);
            return tokens;
        } catch (err) {
            throw err;
        }
    }

    async getMe() {
        try {
            let user = await UserRepository.findUserById({ _id: this.params.id })
            if (!user) {
                throwError("USER_DOES_NOT_EXIST");
            }
            let normalized = {
                "id": user._id,
                "email": user.email,
                "name": user.name,
                "username_payment": user.username_payment,
                "category": user.category,
                "score": user.score
            }
            return normalized;
        } catch (err) {
            throw err;
        }
    }

    async resetPassword() {
        try {
            let user = await UserRepository.findUserByEmail({ email: this.params.email });
            if (!user) {
                throwError("EMAIL_NOT_EXISTENT");
            }
            let resetToken = { tokenResetPass: generateTokenResetPassword({ id: user._id, time: (new Date(((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000))).getTime() }) }
            await UserRepository.setResetPassToken(user._id, resetToken)
            await EmailSingleton.sendEmail({
                from: process.env.EMAIL_FROM,
                to: this.params.email,
                subject: 'Redefina Sua Senha!',
                html: TemplateSingleton.registerUser({ email: resetToken.tokenResetPass })
            });
            return resetToken;
        } catch (err) {
            throw err;
        }
    }

    async setResetPassword() {
        try {
            let payload = verifyTokenResetPassword(this.params.token);
            if (!payload) {
                throwError("TOKEN_INVALID");
            }

            let user = await UserRepository.findUserById({ _id: payload.id });

            if (!user) {
                throwError("EMAIL_NOT_EXISTENT");
            }

            if (Number((new Date()).getTime()) > Number(payload.time)) {
                throwError('TOKEN_EXPIRED');
            }

            if (String(user.tokenResetPass) !== String(this.params.token)) {
                throwError("TOKEN_INVALID");
            }

            let password = generateHash(this.params.password);

            let updatePassword = await UserRepository.updateUserPassword({ id: user._id, password: password });
            if (!updatePassword) {
                throwError('UNKNOWN');
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

    async edit() {
        try {
            const user = await UserRepository.findUserById({ _id: this.params.id });
            if (!user) {
                throwError("USER_DOES_NOT_EXIST");
            }
            user.name = this.params.name ? this.params.name : user.name;
            return await UserRepository.editUser({ id: user._id, name: user.name })
        } catch(err) {
            throw err;
        }
    }
}