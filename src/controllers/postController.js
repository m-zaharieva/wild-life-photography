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
            // console.log(post);
            res.render('post/details', {...post});
        })
        .catch(err => {
            console.log('Post Controller Details Page Error', err.message);
        });
};

const editView = (req, res) => {
    let postId = req.params.id;
    postService.getPostById(postId)
        .then(post => {
            res.render('post/edit', {...post});
        })
};

const editPost = (req, res) => {
    let userInput = req.body;
    let postId = req.params.id;

    postService.editPost(userInput, postId)
        .then(post => {
            post.save();
            res.redirect(`/posts/${postId}`);
        })
        .catch(err => {
            console.log('Post Controller Edit Post Error: ', err.message);
        })
};

const deletePost = (req, res) => {
    let postId = req.params.id;
    postService.deletePost(postId)
        .then( () => {
            res.redirect('/library');
        })
        .catch(err => {
            // TODO: Error handler
            console.log('Post Controller Delete post Error: ', err.message);
        })
};

const upVotePost = (req, res) => {
    let postId = req.params.id;
    let userId = req.user._id;
    
    postService.upVotePost(postId, userId)
        .then(post => {
            res.redirect(`/posts/${postId}`);
        })
        .catch(err => {
            console.log('Post Controller Upvote Error: ', err.message);
        })

};


router.get('/create', createView);
router.post('/create', createPost);
router.get('/:id', detailsView);
router.get('/:id/edit', editView);
router.post('/:id/edit', editPost);
router.get('/:id/delete', deletePost);
router.get('/:id/upVote', upVotePost);

module.exports = router;