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
};

exports.isAuth = (req, res, next) => {
    let token = req.cookies[COOKIE_NAME];
    if (token) {
      return next();
    } else {
        res.redirect('/user/login');
    }
}

exports.isGuest = (req, res, next) => {

}

exports.isOwner = (req, res, next) => {

}