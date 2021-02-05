import {Mongoose} from 'mongoose';
require('dotenv').config();
const mongoConnectionString = process.env.MONGO_URL;

class database {
    async start() {
        this.connectMain = new Mongoose();
        this.connectMain.set('useFindAndModify', false);
        await this.connectMain.connect(`${mongoConnectionString}estacionamento?authSource=admin&w=majority%20%2Fredis&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return true;
    }
    getConnectMain() {
        return this.connectMain;
    }
}

const DatabaseSingleton = new database();

export {
    DatabaseSingleton
}