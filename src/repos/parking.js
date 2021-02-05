import { ParkingSchema } from "../schemas/parking";
import Repository from "./repository";


class Parking extends Repository {

    constructor() {
        super(ParkingSchema);
    }

    login({ email, password }) {
        return new Promise((resolve, reject) => {
            ParkingSchema.prototype.model
                .findOne({ email, password })
                .exec((err, item) => {
                    if (err) { reject(err) }
                    resolve(item);
                });
        });
    }
}
const ParkingRepository = new Parking();

export {
    ParkingRepository
}