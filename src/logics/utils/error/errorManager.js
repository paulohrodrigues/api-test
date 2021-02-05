const errors = {
    "UNKNOWN": {
        "code": 0,
        "message": "Internal Error, Please contact the Customer Service"
    },
    "ERROR_PARAMS": {
        "code": 1,
        "message": "Error in Params"
    },
    "ERROR_NAME": {
        "code": 2,
        "message": "Error in Name"
    },
    "ERROR_LOGIN_OR_PASSWORD": {
        "code": 3,
        "message": "Error in Login or Password"
    },
    "TOKEN_INVALID": {
        "code": 4,
        "message": "Token Invalid"
    },
    "EMAIL_ALREADY_REGISTERED": {
        "code": 5,
        "message": "E-mail already registered"
    },
    "EMAIL_NOT_EXISTENT": {
        "code": 6,
        "message": "Email does not exist"
    },
    "TOKEN_EXPIRED": {
        "code": 7,
        "message": "Expired Token"
    },
};

export const throwError = (value) => {
    if(errors[value]!=undefined) {
        throw {
            code: errors[value].code,
            message: errors[value].message,
        };
    } else {
        throw {
            code: 401,
            message: 'Contact Support',
        }
    }
}