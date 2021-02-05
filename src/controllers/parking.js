import ParkingLogic from "../logics/parking";
import { responseError, responseSuccess } from "../logics/utils/ligth/response";

const createParkingController = async (req, res) => {
    try {
        const parking = new ParkingLogic(req.body);
        responseSuccess((await parking.createParking()), res);
    } catch (err) {
        responseError(err, res);
    }
}

const outParkingController = async (req, res) => {
    try {
        const parking = new ParkingLogic(req.body);
        responseSuccess((await parking.outParking()), res);
    } catch (err) {
        responseError(err, res);
    }
}

const payParkingController = async (req, res) => {
    try {
        const parking = new ParkingLogic(req.body);
        responseSuccess((await parking.payParking()), res);
    } catch (err) {
        responseError(err, res);
    }
}

const historicParkingPerPlateController = async (req, res) => {
    try {
        const parking = new ParkingLogic(req.body);
        responseSuccess((await parking.historicParkingPerPlate()), res);
    } catch (err) {
        responseError(err, res);
    }
}

export {
    createParkingController,
    outParkingController,
    payParkingController,
    historicParkingPerPlateController
}