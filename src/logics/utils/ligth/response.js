const responseSuccess = (data, res) => {
    res.status(data.code).json({message: data.data});
};

const responseError = (error, res) => {
    res.status( error.code == undefined ? 404 : error.code ).json({message: error.message});
};

export {
    responseSuccess,
    responseError
}
