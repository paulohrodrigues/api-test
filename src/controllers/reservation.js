import ReservationLogic from "../logics/reservation";
import { responseError, responseSuccess } from "../logics/utils/ligth/response";

const createReservationController = async (req, res) => {
    try {
        const reservation = new ReservationLogic(req.body);
        responseSuccess((await reservation.createReservation()), res);
    } catch (err) {
        responseError(err, res);
    }
}

const outReservationController = async (req, res) => {
    try {
        const reservation = new ReservationLogic({id: req.params.id});
        responseSuccess((await reservation.outReservation()), res);
    } catch (err) {
        responseError(err, res);
    }
}

const payReservationController = async (req, res) => {
    try {
        const reservation = new ReservationLogic({id: req.params.id});
        responseSuccess((await reservation.payReservation()), res);
    } catch (err) {
        responseError(err, res);
    }
}

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