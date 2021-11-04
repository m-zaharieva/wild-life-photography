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
            if(post.votes.includes(userId)) {
                return post.save();
            }
            post.votes.push(userId);
            post.rating += 1;
            return post.save();
            
        });
}

const downVotePost = (postId, userId) => {
    return Post.findById(postId)
        .then(post => {
            if(post.votes.includes(userId)) {
                return post.save();
            }
            post.votes.push(userId);
            post.rating -= 1;
            return post.save();
        });
}

const detailsPost = (id) => {
    return Post.findById(id).populate('author').populate('votes').lean();
}






const postService = {
    createPost,
    detailsPost,
    editPost,
    deletePost,
    upVotePost,
    downVotePost,
};

module.exports = postService;