import request from 'supertest';

const methods = {
    createReservation: (server, params) => {
        return request(server)
        .post('/parking')
        .send(params)
        .then(res => res)
    },
    outReservation: (server, params, id) => {
        return request(server)
        .patch(`/parking/${id}/out`)
        .send(params)
        .then(res => res)
    },
    payReservation: (server, params, id) => {
        return request(server)
        .patch(`/parking/${id}/pay`)
        .send(params)
        .then(res => res)
    },
    historicReservationPerPlate: (server, params, plate) => {
        return request(server)
        .get(`/parking/${plate}`)
        .send(params)
        .then(res => res)
    }
};

export {
    methods
}