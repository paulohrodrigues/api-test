const responseSuccess = (data, res) => {
    res.json({message: data, code: 200});
};

const responseError = (error, res) => {
    res.json({message: error.message, code: error.code == undefined ? 404 : error.code});
};

export {
    responseSuccess,
    responseError
}
