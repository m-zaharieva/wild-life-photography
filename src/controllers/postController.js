const router = require('express').Router();

const postService = require('./../services/postService.js');


const createView = (req, res) => {
    res.render('post/create');
};

const createPost = (req, res) => {
    let userInput = req.body;
    userInput.author = res.user._id;
    
    postService.createPost(userInput)
        .then(post => {
            res.redirect('/library');
        })
        .catch(err => {
            console.log('Post Controller Create Post Error: ', err.message);
        })
    
};

const detailsView = (req, res) => {
    let postId = req.params.id;
    
    postService.getPostById(postId)
        .then(post => {
            res.render('post/details', {...post});
        })
        .catch(err => {
            console.log('Post Controller Details Page Error', err.message);
        });
};


router.get('/create', createView);
router.post('/create', createPost);
router.get('/:id', detailsView);

module.exports = router;