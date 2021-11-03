const router = require('express').Router();



const createView = (req, res) => {
    res.render('post/create');
}



router.get('/create', createView);

module.exports = router;