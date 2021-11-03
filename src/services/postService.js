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

const upVotePost = (postId, userId) => {
    return Post.findById(postId)
        .then(post => {
            post.votes.push(userId);
            post.rating += 1;
            return post.save();
            
        });
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
    upVotePost,
};

module.exports = postService;