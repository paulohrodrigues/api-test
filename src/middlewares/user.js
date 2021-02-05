import { throwError } from "../logics/utils/error/errorManager";
import { responseError } from "../logics/utils/ligth/response";
import { verifyJWT } from "../logics/utils/security/security";
import { UserRepository } from "../repos/user";

const authMiddleware = async (req, res, next) => {
    try {
        const id = verifyJWT(req.headers['x-access-token']);
        if(!id) throwError("TOKEN_INVALID");
        let user = await UserRepository.getByTokenAccess({tokenAccess : req.headers['x-access-token']});
        if(!user) throwError("TOKEN_INVALID");
        req.body["id"] = id;
        next();
    } catch(err) {
        responseError(err, res);
    }
};

export {
    authMiddleware,
}