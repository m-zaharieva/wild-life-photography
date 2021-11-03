const Post = require('./../models/Post.js');



const createPost = (userInput) => {
    return Post.create({...userInput});
}

const editPost = (userInput, postId) => {
    return Post.findByIdAndUpdate(postId, userInput);
}

const deletePost = (postId) => {
    return Post.findByIdAndDelete(postId);
}


const getPostById = (id) => {
    // ! Check if the double populatetion is working, when I want to get the voteres data and display it. 
    return Post.findById(id).populate('author').populate('votes').lean();
}






const postService = {
    createPost,
    getPostById,
    editPost,
    deletePost,
};

module.exports = postService;