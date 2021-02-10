import Mocha from 'mocha';
const mocha = new Mocha({});
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
        it('Success', mochaAsync(async () => {
            const res = await methods.createReservation(serve, dataToCreate);
            dataResCreate = res.body.message;
            expect(res.status).to.equal(200);
        }));
        it('Invalid Plate', mochaAsync(async () => {
            const res = await methods.createReservation(serve, {plate: "AAA-123"});
            expect(res.status).to.equal(400);
        }));
        it('Reservation Already Open', mochaAsync(async () => {
            const res = await methods.createReservation(serve, dataToCreate);
            expect(res.status).to.equal(400);
        }));
    });
    context('Pay Reservation', async () => {
        it('Success', mochaAsync(async () => {
            const res = await methods.payReservation(serve, {}, dataResCreate._id);
            expect(res.status).to.equal(200);
        }));
        it('Reservation Not Found', mochaAsync(async () => {
            let id = Array.from(dataResCreate._id);
            id[0] = "1";
            id=id.join('');
            const res = await methods.payReservation(serve, {}, id);
            expect(res.status).to.equal(400);
        }));
        it('Reservation Already Paid', mochaAsync(async () => {
            const res = await methods.payReservation(serve, {}, dataResCreate._id);
            expect(res.status).to.equal(400);
        }));
    });
    context('Out Reservation', async () => {
        it('Success', mochaAsync(async () => {
            const res = await methods.outReservation(serve, {}, dataResCreate._id);
            expect(res.status).to.equal(200);
        }));
        it('Reservation Not Found', mochaAsync(async () => {
            let id = Array.from(dataResCreate._id);
            id[0] = "1";
            id=id.join('');
            const res = await methods.outReservation(serve, {}, id);
            expect(res.status).to.equal(400);
        }));
        it('Reservation Not Paid', mochaAsync(async () => {
            const resCreate = await methods.createReservation(serve, {plate: "AAA-"+(Math.floor(Math.random() * (9999 - 1000 + 1) ) + 1000)});
            const dataResCreateLocal = resCreate.body.message;
            const res = await methods.outReservation(serve, {}, dataResCreateLocal._id);
            expect(res.status).to.equal(400);

        }));
        it('Reserve Already Released', mochaAsync(async () => {
            const res = await methods.outReservation(serve, {}, dataResCreate._id);
            expect(res.status).to.equal(400);
        }));
    });
    context('Historic Reservation', async () => {
        it('Success', mochaAsync(async () => {
            const res = await methods.historicReservationPerPlate(serve, {}, dataResCreate.plate);
            expect(res.status).to.equal(200);
        }));
        it('Empty Search', mochaAsync(async () => {
            const res = await methods.historicReservationPerPlate(serve, {offset: 0, size: 10}, dataResCreate.plate);
            expect(res.status).to.equal(200);
        }));
        it('Offset And Size Empty', mochaAsync(async () => {
            const res = await methods.historicReservationPerPlate(serve, {}, dataResCreate.plate);
            expect(res.status).to.equal(200);
        }));
        it('Offset Empty', mochaAsync(async () => {
            const res = await methods.historicReservationPerPlate(serve, {size: 10}, dataResCreate.plate);
            expect(res.status).to.equal(200);
        }));
        it('Size Empty', mochaAsync(async () => {
            const res = await methods.historicReservationPerPlate(serve, {offset: 0}, dataResCreate.plate);
            expect(res.status).to.equal(200);
        }));
    });
});

