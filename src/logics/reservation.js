import Logic from "./logic";
import { ReservationRepository } from "../repos/reservation";
import { throwError } from "./utils/error/errorManager";
import { MaskSingleton } from "./utils/check/mask";
require('dotenv').config();

export default class ReservationLogic extends Logic {
    constructor(params) {
        super(params, {
            db: ReservationRepository,
            child: []
        });
        this.params = params;
    }
    async createReservation() {
        try {
            const {plate} = this.params;
            if(!MaskSingleton.checkMaskPlate(plate)) {
                throwError("INVALID_PLATE");
            }
            if((await ReservationRepository.findOne({query: {plate, paid: false}}))) {
                throwError("OPEN_RESERVATION");
            }

            const responseSave = await this.save({
                plate
            });

            return {data:responseSave, code: 200};
        } catch (err) {
            throw err;
        }
    }
    async outReservation() {
        try {
            const {id} = this.params;
            const responseReservation = await ReservationRepository.findOne({
                query: {
                    _id  : id
                }
            });

            if(!responseReservation) {
                throwError("RESERVATION_NOT_FOUND");
            }
            if(!responseReservation.paid) {
                throwError("NOT_PAID");
            }
            if(responseReservation.left) {
                throwError("ALREADY_RELEASED");
            }

            const time = (new Date().getTime() - new Date(responseReservation.createdAt).getTime()) / 1000 / 60;
            await ReservationRepository.update({
                query: {
                    _id: id
                },
                data: {
                    left: true,
                    time: `${time} minutes`
                }
            });
            return {data: {}, code:200};
        } catch (err) {
            throw err;
        }
    }
    async payReservation() {
        try {
            const {id} = this.params;

            const responseReservation = await ReservationRepository.findOne({
                query: {
                    _id  : id
                }
            });

            if(!responseReservation) {
                throwError("RESERVATION_NOT_FOUND");
            }
            if(responseReservation.paid) {
                throwError("ALREADY_PAID");
            }

            await ReservationRepository.update({
                query: {
                    _id  : id
                },
                data: {
                    paid: true
                }
            });

            return{data: {}, code: 200};
        } catch (err) {
            throw err;
        }
    }
    async historicReservationPerPlate() {
        try {
            const {plate, offset, size} = this.params;
            return {
                data: (await ReservationRepository.findByPlate({plate, offset, size})),
                code: 200
            };
        } catch (err) {
            throw err;
        }
    }
}