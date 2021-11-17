// Import third-party modules
const router = require('express').Router();

// Import local modules 
const authService = require('./../services/authService.js');
const {TOKEN_SECRET, COOKIE_NAME} = require('./../config/constants.js');


const loginView = (req, res) => {
    res.render('user/login');
}

const registerView = (req, res) => {
    res.render('user/register');
};

const registerUser = (req, res) => {
    // TODO: Change the name attribute in the register.hbs file according to the current requirements.
    // TODO: Validate input data before sending to service.
    // TODO: Update jwt payload object according to the requirements.
    let userInput = req.body;
    
    // Check if both passwords have a match
    if (userInput.password !== userInput.repeatPassword) {
        throw new Error('Passwords don\'t match!');
    }

    authService.register(userInput)
        .then(user => {
            if (!user) {
                throw new Error('Unable to register. Please try again later');
            }
            user.save();
            return authService.createToken(user, TOKEN_SECRET)
        })
        .then(token => {
            res.cookie(COOKIE_NAME, token);
            res.redirect('/');
        })
        .catch(err => {
            // TODO: Error Handler
            console.log('Registration Controller error', err.message);
        });
};

const loginUser = (req, res) => {
    let userInput = req.body; 
    authService.login(userInput)
        .then(([isValid, user]) => {
            if(!isValid) {
                throw new Error('Incorrect username or password');
            }
            return authService.createToken(user, TOKEN_SECRET)
        })
        .then(token => {
            res.cookie(COOKIE_NAME, token);
            res.redirect('/');
        })
        .catch(err => {
            console.log('Login Controller Error', err.message);
        })
};

const logoutUser = (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
}

router.get('/register', registerView);
router.get('/login', loginView);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;


//hustagil