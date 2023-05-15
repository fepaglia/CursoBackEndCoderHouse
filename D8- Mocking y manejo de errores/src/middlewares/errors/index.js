import EErrors from "../../services/errors/enums.js";

export default (error, req, res, next) =>{
    switch(error.code) {
        case EErrors.INCOMPLETE_FIELDS_USER_REGISTER_ERROR:
            res.status(400).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
            break;
        case EErrors.INCOMPLETE_FIELDS_PRODUCTS_ERROR:
            res.status(400).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
            break;
        default:
            res.status(400).send({
                status: 'error',
                error: 'unhandled error'
                });
            break;
    }
    next();
}