export const authorizeRol = (role) => (req, res, next) => {
    if (req.user.user.role === role) {
        next();
    } else {
        res.status(401).send('Unauthorized, You dont have permission');
    }
};