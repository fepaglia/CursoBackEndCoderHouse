export default class CustomError {
    static createError({name = 'error', cause, message, code = 1}){
        let error = new Error(message, {cause});

        error.name = name,
        error.code = code;
        return error;
    }
};