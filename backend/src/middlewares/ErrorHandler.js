import ApiError from '../utils/ApiError.js';

const ErrorHandling = (err, req, res, next) => {
    const obj = {};
    if (err instanceof ApiError) {
        obj['statuscode'] = err.statuscode || 500;
        obj['message'] = err.message;
        obj['stack'] = err.stack;
    } else {
        obj['statuscode'] = 400;
        obj['message'] = err.message;
        obj['stack'] = err.stack;
    }
    res.status(obj.statuscode).json(obj);
};

export default ErrorHandling;
