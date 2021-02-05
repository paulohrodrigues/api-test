import UserLogic from "../logics/user";
import { responseError, responseSuccess } from "../logics/utils/ligth/response";

const userLoginController = async (req, res) => {
    try {
        const user = new UserLogic(req.body);
        let result = await user.login();
        responseSuccess(result, res);
    } catch (err) {
        responseError(err, res);
    }
}

const userRegisterController = async (req, res) => {
    try {
        const user = new UserLogic(req.body);
        let result = await user.register();
        responseSuccess(result, res);
    } catch (err) {
        responseError(err, res);
    }
}

const userTokenController = async (req, res) => {
    try {
        const user = new UserLogic(req.body);
        let result = await user.token();
        responseSuccess(result, res);
    } catch (err) {
        responseError(err, res);
    }
}

const userGetMeController = async (req, res) => {
    try {
        const params = {
            ...req.body,
            id: req.params.id
        }
        const user = new UserLogic(params);
        let result = await user.getMe();
        responseSuccess(result, res);
    } catch (err) {
        responseError(err, res);
    }
}

const userResetPasswordController = async (req, res) => {
    try {
        const user = new UserLogic(req.body);
        let result = await user.resetPassword();
        responseSuccess(result, res);
    } catch (err) {
        responseError(err, res);
    }
}

const userResetPasswordSetController = async (req, res) => {
    try {
        const user = new UserLogic(req.body);
        let result = await user.setResetPassword();
        responseSuccess(result, res);
    } catch (err) {
        responseError(err, res);
    }
}

const userEditController = async (req, res) => {
    try {
        const params = {
            ...req.body,
            id: req.params.id
        }
        const user = new UserLogic(params);
        const result = await user.edit();
        responseSuccess(result, res);
    } catch(err) {
        responseError(err, res);
    }
}

export {
    userLoginController,
    userTokenController,
    userRegisterController,
    userEditController,
    userGetMeController,
    userResetPasswordController,
    userResetPasswordSetController
}