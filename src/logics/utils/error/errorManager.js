const errors = {
    "UNKNOWN": {
        "code": 401,
        "message": "Internal Error, Please contact the Customer Service"
    },
    "INVALID_PLATE": {
        "code": 400,
        "message": "Invalid Plate"
    },
    "OPEN_RESERVATION": {
        "code": 400,
        "message": "There is already an open reserve for this plate"
    },
    "NOT_PAID": {
        "code": 400,
        "message": "Car can only be released after payment"
    },
    "ALREADY_PAID": {
        "code": 400,
        "message": "This reservation is already paid"
    },
    "RESERVATION_NOT_FOUND": {
        "code": 400,
        "message": "Reservation not found"
    },
    "ALREADY_RELEASED": {
        "code": 400,
        "message": "This reserve is already released"
    }
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