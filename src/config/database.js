const mongoose = require('mongoose');

exports.db = (connectionString) => {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};