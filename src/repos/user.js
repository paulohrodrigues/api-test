import { UserSchema } from "../schemas/user";
import Repository from "./repository";


class User extends Repository {

    constructor() {
        super(UserSchema);
    }

    login({ email, password }) {
        return new Promise((resolve, reject) => {
            UserSchema.prototype.model
                .findOne({ email, password })
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
        });
    }

    getByTokenRefresh({ tokenRefresh }) {
        return new Promise((resolve, reject) => {
            UserSchema.prototype.model.findOne({ tokenRefresh })
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
        });
    }

    getByTokenAccess({ tokenAccess }) {
        return new Promise((resolve, reject) => {
            UserSchema.prototype.model.findOne({ tokenAccess })
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
        });
    }

    findUserById({ _id }) {
        return new Promise((resolve, reject) => {
            UserSchema.prototype.model.findOne({ _id })
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
        });
    }

    findUserByEmail({ email }) {
        return new Promise((resolve, reject) => {
            UserSchema.prototype.model.findOne({ email })
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
        });
    }

    setTokens(_id, { tokenAccess, tokenRefresh }) {
        return new Promise((resolve, reject) => {
            UserSchema.prototype.model.findByIdAndUpdate({ _id }, { tokenAccess, tokenRefresh })
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
        });
    }

    setResetPassToken(_id, { tokenResetPass }) {
        return new Promise((resolve, reject) => {
            UserSchema.prototype.model.findByIdAndUpdate({ _id }, { tokenResetPass })
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
        });
    }

    updateUserPassword({ id, password }) {
        return new Promise((resolve, reject) => {
            UserSchema.prototype.model.findByIdAndUpdate(
                id,
                { $set: { "password": password } },
                { 'new': true })
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
        });
    }

    editUser({ id, name }) {
        try {
            return new Promise((resolve, reject) => {
                UserSchema.prototype.model.findByIdAndUpdate(
                    id,
                    { name: name },
                    { new: true },
                ).exec( (err, item) => {
                    if(err) { reject(err) }
                    resolve(item);
                });
            });
        } catch(err) {
            throw err;
        }
        
    }
}
const UserRepository = new User();

export {
    UserRepository
}