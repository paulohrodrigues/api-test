import { DatabaseSingleton } from "../core/mongo";
let db = DatabaseSingleton.getConnectMain();
class ReservationSchema{};

ReservationSchema.prototype.name = "Reservation";

ReservationSchema.prototype.schema = {
    plate : { type: String, required : true },
    paid  : { type: Boolean, default: false },
    left  : { type: Boolean, default: false },
    time  : { type: String, default: "0 minutes" }
};

ReservationSchema.prototype.model = db.model(ReservationSchema.prototype.name, new db.Schema(ReservationSchema.prototype.schema, { timestamps: true }));

export {
    ReservationSchema
}
