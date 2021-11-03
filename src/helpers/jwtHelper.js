const jwt = require('jsonwebtoken');

exports.jwtSign = (payload, secret) => {
    let promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, (err, token) => {
            if(err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
    return promise;
}

exports.jwtVerify = (token, secret) => {
    let promise = new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                reject(err);
            } else {
                resolve(decodedToken);
            }
        });
    });
    return promise;
}