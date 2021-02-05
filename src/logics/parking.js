import Logic from "./logic";
import { ParkingRepository } from "../repos/parking";
import { throwError } from "./utils/error/errorManager";
require('dotenv').config();

export default class ParkingLogic extends Logic {
    constructor(params) {
        super(params, {
            db: ParkingRepository,
            child: []
        });
        this.params = params;
    }

    async createParking() {
        try {

            if(this.params){

            }

            return await this.save({
                
            });
        } catch (err) {
            throw err;
        }
    }
    async outParking() {
        try {
            return await this.save({
                password: generateHash(this.params.password)
            });
        } catch (err) {
            throw err;
        }
    }
    async payParking() {
        try {
            return await this.save({
                password: generateHash(this.params.password)
            });
        } catch (err) {
            throw err;
        }
    }
    async historicParkingPerPlate() {
        try {
            return await this.save({
                password: generateHash(this.params.password)
            });
        } catch (err) {
            throw err;
        }
    }
}