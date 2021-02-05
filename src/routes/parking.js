import {createParkingController, outParkingController, payParkingController, historicParkingPerPlateController} from "../controllers";

const parking = [
    {
        method: 'post',
        path  : '/parking',
        route : createParkingController
    },
    {
        method: 'put',
        path  : '/parking/:id/out',
        route : outParkingController
    },
    {
        method: 'put',
        path  : '/parking/:id/pay',
        route : payParkingController
    },
    {
        method: 'get',
        path  : '/parking/:plate',
        route : historicParkingPerPlateController
    }
];

export default parking;