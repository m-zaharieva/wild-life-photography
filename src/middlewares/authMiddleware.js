const { COOKIE_NAME, TOKEN_SECRET } = require('./../config/constants.js');
const { jwtVerify } = require('./../helpers/jwtHelper.js');

exports.authMiddleware = (req, res, next) => {
    let token = req.cookies[COOKIE_NAME];
    if (!token) {
        return next();
    }
    
    return jwtVerify(token, TOKEN_SECRET)
        .then(user => {
            req.user = user;
            res.locals.user = user;
            next();
        });
}