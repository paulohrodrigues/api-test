import request from 'supertest';

const methods = {
    createReservation: (server, params) => {
        return request(server)
        .post('/api/parking')
        .send(params)
        .then(res => res)
    },
    outReservation: (server, params, id) => {
        return request(server)
        .patch(`/api/parking/${id}/out`)
        .send(params)
        .then(res => res)
    },
    payReservation: (server, params, id) => {
        return request(server)
        .patch(`/api/parking/${id}/pay`)
        .send(params)
        .then(res => res)
    },
    historicReservationPerPlate: (server, params, plate) => {
        return request(server)
        .get(`/api/parking/${plate}`)
        .send(params)
        .then(res => res)
    }
};

export {
    methods
}