import ReservationLogic from "../logics/reservation";
import { responseError, responseSuccess } from "../logics/utils/ligth/response";

/**
 * @api {post} /parking
 * @apiName CreateReservation
 * @apiGroup Reservation
 *
 * @apiParam {String} plate license plate.
 *
 * @apiSuccess {String} _id uid Reservation.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "0x2343r7Tv23eD343"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid Plate"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "There is already an open reserve for this plate"
 *     }
 */
const createReservationController = async (req, res) => {
    try {
        const reservation = new ReservationLogic(req.body);
        responseSuccess((await reservation.createReservation()), res);
    } catch (err) {
        responseError(err, res);
    }
}

/**
 * @api {patch} /parking/:id/out
 * @apiName OutReservation
 * @apiGroup Reservation
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 *     {
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Bad Request
 *     {
 *       "message": "Reservation not found"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Car can only be released after payment"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "This reserve is already released"
 *     }
 */
const outReservationController = async (req, res) => {
    try {
        const reservation = new ReservationLogic({id: req.params.id});
        responseSuccess((await reservation.outReservation()), res);
    } catch (err) {
        responseError(err, res);
    }
}

/**
 * @api {patch} /parking/:id/pay
 * @apiName PayReservation
 * @apiGroup Reservation
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 *     {
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Bad Request
 *     {
 *       "message": "Reservation not found"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "This reservation is already paid"
 *     }
 */
const payReservationController = async (req, res) => {
    try {
        const reservation = new ReservationLogic({id: req.params.id});
        responseSuccess((await reservation.payReservation()), res);
    } catch (err) {
        responseError(err, res);
    }
}

/**
 * @api {get} /parking/:plate
 * @apiName HistoricReservationPerPlate
 * @apiGroup Reservation
 *
 * @apiParam {Number} size limit find.
 * @apiParam {Number} offset pagination.
 *
 * @apiSuccess {String} _id uid Reservation.
 * @apiSuccess {String} plate license plate.
 * @apiSuccess {String} time opening time until payment.
 * @apiSuccess {Boolean} paid if it's paid.
 * @apiSuccess {Boolean} left if already left.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "0x2343r7Tv23eD343",
 *       "plate": "AAA-1234",
 *       "time": "2 minutes",
 *       "paid": true,
 *       "left": true
 *     }
 */
const historicReservationPerPlateController = async (req, res) => {
    try {
        const {offset, size} = req.body;
        const reservation = new ReservationLogic({plate: req.params.plate, offset, size});
        responseSuccess((await reservation.historicReservationPerPlate()), res);
    } catch (err) {
        responseError(err, res);
    }
}

export {
    createReservationController,
    outReservationController,
    payReservationController,
    historicReservationPerPlateController
}