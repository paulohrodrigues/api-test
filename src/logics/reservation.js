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

            if(MaskSingleton.checkMaskPlate(plate)) {
                throwError("");
            }
            if((await ReservationRepository.findOne({query: {plate, paid: false}}))) {
                throwError("");
            }

            return await this.save({
                plate
            });
        } catch (err) {
            throw err;
        }
    }
    async outReservation() {
        try {
            const {id} = this.params;
            const resReservation = await ReservationRepository.findOne({
                query: {
                    _id  : id,
                    paid: true
                }
            });
            if(!resReservation) {
                throwError("");
            }
            const time = (new Date().getTime() - new Date(resReservation.createdAt).getTime()) / 1000 / 60;
            await ReservationRepository.update({
                query: {
                    _id: id
                },
                data: {
                    left: true,
                    time: `${time} minutes`
                }
            });
            return {};
        } catch (err) {
            throw err;
        }
    }
    async payReservation() {
        try {
            const {id} = this.params;

            const resReservation = await ReservationRepository.findOne({
                query: {
                    _id  : id,
                    left : false,
                    paid : false
                }
            });
            if(!resReservation) {
                throwError("");
            }
            await ReservationRepository.update({
                query: {
                    _id  : id
                },
                data: {
                    paid: true
                }
            });

            return{};
        } catch (err) {
            throw err;
        }
    }
    async historicReservationPerPlate() {
        try {
            const {plate, offset, size} = this.params;
            return (await ReservationRepository.findByPlate({plate, offset, size}));
        } catch (err) {
            throw err;
        }
    }
}