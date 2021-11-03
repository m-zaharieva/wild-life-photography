const router = require('express').Router();

const homeService = require('./../services/homeService.js');


const homeView = (req, res) => {
    res.render('home');
};


router.get('/', homeView);

module.exports = router;