// Third-party modules
const User = require('./../models/User.js');
const bcrypt = require('bcrypt');

// Local modules
const { jwtSign } = require('../helpers/jwtHelper.js');

const register = (userInput) => {
    // TODO: Change the variable parameter depends on the model requirements.
    return findByEmail(userInput.email)
        .then(user => {
            if (user) {
                throw new Error ('This username is already taken.');
            }
            return bcrypt.hash(userInput.password, 10);
        })
        .then(hash => {
            return User.create({firstName: userInput.firstName, lastName: userInput.lastName, email: userInput.email, hashedPassword: hash});
        })
        .catch(err => {
            // TODO: Error handler
            console.log('Register Service error', err.message);
        });
}

const login = (userInput) => {
    return findByEmail(userInput.email)
        .then(user => {
            console.log(user);
            if (!user) {
                throw new Error ('Incorrect username or password');
            }
            return Promise.all([bcrypt.compare(userInput.password, user.hashedPassword), user]);
        });
}

const createToken = (userData, secret) => {
    let payload = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        _id: userData._id,
    };

    return jwtSign(payload, secret);
}

const findByEmail = (email) => {
    // TODO: Change the variable depend on model requirements
    return User.findOne({email});
}

const authService = {
    register,
    login,
    createToken,
    findByEmail,
}

module.exports = authService;