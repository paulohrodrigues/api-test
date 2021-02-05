import {userLoginController, userTokenController, userRegisterController, userGetMeController, userResetPasswordController, userResetPasswordSetController, userEditController} from "../controllers";
import { authMiddleware } from "../middlewares";

const userRoute = [
    {
        method: 'post',
        path  : '/user/login',
        route : userLoginController
    },
    {
        method: 'post',
        path  : '/token',
        route : userTokenController
    },
    {
        method: 'post',
        path  : '/user/register',
        route : userRegisterController
    },
    {
        middlewares: [authMiddleware],
        method: 'patch',
        path: 'user/edit/:id',
        route: userEditController,
    },
    {
        method: 'get',
        path  : '/user/get/me/:id',
        route : userGetMeController
    },
    {
        method: 'post',
        path  : '/user/password/reset/ask',
        route : userResetPasswordController
    },
    {
        method: 'post',
        path  : '/user/password/reset/set',
        route : userResetPasswordSetController
    },
];

export default userRoute;