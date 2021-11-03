const Post = require('./../models/Post.js');



const createPost = (userInput) => {
    return Post.create({...userInput});
}







const postService = {
    createPost,
};

module.exports = postService;