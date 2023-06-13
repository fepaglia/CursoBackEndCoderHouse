export const authorizeRol = (rol) => (req, res, next) => {
    if (req.user.user.rol === rol) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};