const mongoose = require('mongoose');


// TODO: Change the user model depends on the project requirements.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        // minlength: 5,
        // validate: [/^[a-zA-Z0-9]+$/, 'Username should have only english letters and digits'],
    },
    lastName: {
        type: String,
        required: true,
        // minlength: 5,
        // validate: [/^[a-zA-Z0-9]+$/, 'Username should have only english letters and digits'],
    },
    email: {
        type: String,
        required: true,
        // minlength: 5,
        // validate: [/^[a-zA-Z0-9]+$/, 'Username should have only english letters and digits'],
    },
    hashedPassword: {
        type: String,
        required: true,
        minlength: 10,
    },
    posts: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    },
});


const User = mongoose.model('User', userSchema);

module.exports = User;