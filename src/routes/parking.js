import {createReservationController, outReservationController, payReservationController, historicReservationPerPlateController} from "../controllers";

const parking = [
    {
        method: 'post',
        path  : '/parking',
        route : createReservationController
    },
    {
        method: 'put',
        path  : '/parking/:id/out',
        route : outReservationController
    },
    {
        method: 'put',
        path  : '/parking/:id/pay',
        route : payReservationController
    },
    {
        method: 'get',
        path  : '/parking/:plate',
        route : historicReservationPerPlateController
    }
];

export default parking;