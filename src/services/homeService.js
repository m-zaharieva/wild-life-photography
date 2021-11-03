const Post = require('./../models/Post.js');


const findAllPosts = () => {
    return Post.find({}).lean();
}


const homeService = {
    findAllPosts,
};

module.exports = homeService;