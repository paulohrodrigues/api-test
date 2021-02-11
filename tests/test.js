import { mochaAsync } from './utils/index';
import chai from 'chai';
const expect = chai.expect;
const delay = require('delay');
import {methods} from "./utils/request";
const app = require("../app/index");

context('Reservation', async () => {
    var serve, dataToCreate, dataResCreate;
    before( async () =>  {
        await delay(10000);
        serve       = await app.app;
        dataToCreate  = {plate: "AAA-"+(Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000)};
    });
    after( async () =>  {
        process.exit(0);
    });
    context('Create Reservation', async () => {
        it('Should Success', mochaAsync(async () => {
            const res = await methods.createReservation(serve, dataToCreate);
            dataResCreate = res.body.message;

            const ReservationRepository = (require("../src/repos/reservation").ReservationRepository);
            dataResCreate = await ReservationRepository.findOne({query: {_id:dataResCreate._id}});

            expect(res.body.message._id).not.equal(null);
            expect(res.body.message).not.equal(null);
            expect(res.body.message._id).not.equal(undefined);
            expect(res.body.message).not.equal(undefined);
            expect(res.body.message._id).to.be.an('string');
            expect(dataResCreate.paid).to.equal(false);
            expect(dataResCreate.left).to.equal(false);
            expect(res.status).to.equal(201);
        }));
        it('Should Invalid Plate', mochaAsync(async () => {
            const res = await methods.createReservation(serve, {plate: "AAA-123"});

            expect(res.body.message).not.equal(null);
            expect(res.body.message).not.equal(undefined);
            expect(res.body.message).to.be.an('string');
            expect(res.body.message).to.equal("Invalid Plate");
            expect(res.status).to.equal(400);
        }));
        it('Should Reservation Already Open', mochaAsync(async () => {
            const res = await methods.createReservation(serve, dataToCreate);

            expect(res.body.message).not.equal(null);
            expect(res.body.message).not.equal(undefined);
            expect(res.body.message).to.be.an('string');
            expect(res.body.message).to.equal("There is already an open reserve for this plate");
            expect(res.status).to.equal(400);
        }));
    });
    context('Pay Reservation', async () => {
        it('Should Success', mochaAsync(async () => {
            const res = await methods.payReservation(serve, {}, dataResCreate._id);
            const ReservationRepository = (require("../src/repos/reservation").ReservationRepository);
            dataResCreate = await ReservationRepository.findOne({query: {_id:dataResCreate._id}});

            expect(dataResCreate.paid).to.equal(true);
            expect(dataResCreate.left).to.equal(false);
            expect(res.status).to.equal(204);
        }));
        it('Should Reservation Not Found', mochaAsync(async () => {
            let id = Array.from(dataResCreate._id);
            id[0] = "1";
            id=id.join('');
            const res = await methods.payReservation(serve, {}, id);

            expect(res.status).to.equal(404);
        }));
        it('Should Reservation Already Paid', mochaAsync(async () => {
            const res = await methods.payReservation(serve, {}, dataResCreate._id);
            expect(res.status).to.equal(400);
        }));
    });
    context('Out Reservation', async () => {
        it('Should Success ', mochaAsync(async () => {
            const res = await methods.outReservation(serve, {}, dataResCreate._id);
            const ReservationRepository = (require("../src/repos/reservation").ReservationRepository);
            dataResCreate = await ReservationRepository.findOne({query: {_id:dataResCreate._id}});

            expect(dataResCreate.paid).to.equal(true);
            expect(dataResCreate.left).to.equal(true);
            expect(res.status).to.equal(204);
        }));
        it('Should Reservation Not Found', mochaAsync(async () => {
            let id = Array.from(dataResCreate._id);
            id[0] = "1";
            id=id.join('');
            const res = await methods.outReservation(serve, {}, id);
            expect(res.status).to.equal(404);
        }));
        it('Should Reservation Not Paid', mochaAsync(async () => {
            const resCreate = await methods.createReservation(serve, {plate: "AAA-"+(Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000)});
            const dataResCreateLocal = resCreate.body.message;
            const res = await methods.outReservation(serve, {}, dataResCreateLocal._id);
            expect(res.status).to.equal(400);

        }));
        it('Should Reserve Already Released', mochaAsync(async () => {
            const res = await methods.outReservation(serve, {}, dataResCreate._id);
            expect(res.status).to.equal(400);
        }));
    });
    context('Historic Reservation', async () => {
        it('Should Success', mochaAsync(async () => {
            const ReservationRepository = (require("../src/repos/reservation").ReservationRepository);
            dataResCreate = await ReservationRepository.findOne({query: {_id:dataResCreate._id}});

            const res = await methods.historicReservationPerPlate(serve, {}, dataResCreate.plate);
            expect(res.status).to.equal(200);
            expect(res.body.message.length).to.equal(1);
        }));
        it('Should Empty Search', mochaAsync(async () => {
            const res = await methods.historicReservationPerPlate(serve, {offset: 0, size: 10}, dataResCreate.plate);
            expect(res.status).to.equal(200);
        }));
        it('Should Offset And Size Empty', mochaAsync(async () => {
            const res = await methods.historicReservationPerPlate(serve, {}, dataResCreate.plate);
            expect(res.status).to.equal(200);
        }));
        it('Should Offset Empty', mochaAsync(async () => {
            const res = await methods.historicReservationPerPlate(serve, {size: 10}, dataResCreate.plate);
            expect(res.status).to.equal(200);
        }));
        it('Should Size Empty', mochaAsync(async () => {
            const res = await methods.historicReservationPerPlate(serve, {offset: 0}, dataResCreate.plate);
            expect(res.status).to.equal(200);
        }));
    });
});

