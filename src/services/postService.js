const Post = require('./../models/Post.js');



const createPost = (userInput) => {
    return Post.create({...userInput});
}

const getPostById = (id) => {
    return Post.findById(id).populate('author').lean();
}





const postService = {
    createPost,
    getPostById,
};

module.exports = postService;