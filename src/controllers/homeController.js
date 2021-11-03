const router = require('express').Router();

const homeService = require('./../services/homeService.js');




const homeView = (req, res) => {
    res.render('home');
};

const allPostsView = (req, res) => {
    homeService.findAllPosts()
        .then(posts => {
            res.render('all-posts', {posts});
        })
        .catch(err => {
            // TODO: Error handler
            console.log('Home Service Error: ', err.message);
        });
}




router.get('/', homeView);
router.get('/library', allPostsView);

module.exports = router;