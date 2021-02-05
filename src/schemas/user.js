import { DatabaseSingleton } from "../core/mongo";
let db = DatabaseSingleton.getConnectMain();
class UserSchema{};

UserSchema.prototype.name = "User";

UserSchema.prototype.schema = {
    name              : { type: String, required : true},
    email             : { type: String, required : true},
    password          : { type: String, required : true},
    tokenAccess       : { type: String },
    tokenRefresh      : { type: String },
    tokenResetPass    : { type: String },
    score             : { type: Number, default: 0, required : true},
    category          : { type: String, default: "FREE", required : true},
    username_payment  : { type: String, default: "@", required : true},
};

UserSchema.prototype.model = db.model(UserSchema.prototype.name, new db.Schema(UserSchema.prototype.schema));

export {
    UserSchema
}
