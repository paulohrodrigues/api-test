import { ReservationSchema } from "../schemas/reservation";
import Repository from "./repository";


class Reservation extends Repository {

    constructor() {
        super(ReservationSchema);
    }

    findOne({ query }) {
        return new Promise((resolve, reject) => {
            ReservationSchema.prototype.model
            .findOne(query)
            .exec((err, item) => {
                if (err) { reject(err) }
                resolve(item);
            });
        });
    }

    update({query, data}) {
        return new Promise((resolve, reject) => {
            ReservationSchema.prototype.model
            .findOneAndUpdate(query,
                {$set: data}
            )
            .exec((err, item) => {
                if (err) { reject(err) }
                resolve(item);
            });
        });
    }

    findByPlate({plate, offset=0, size=10}) {
        return new Promise((resolve, reject) => {
            ReservationSchema.prototype.model
            .find({ plate })
            .skip(offset)
            .limit((!size || size > 10 || size <= 0) ? 10 : size)
            .exec((err, item) => {
                if (err) { reject(err) }
                resolve(item);
            });
        });
    }

}
const ReservationRepository = new Reservation();

export {
    ReservationRepository
}