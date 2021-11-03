const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { PORT, DB_CONNECTION_STRING } = require('./config/constants.js');
const { handlebars } = require('./config/handlebars.js');
const { db } = require('./config/database.js');
const router = require('./routes.js');
const { authMiddleware } = require('./middlewares/authMiddleware.js');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(path.resolve(__dirname, './static')));
app.use(cookieParser());
handlebars(app);
app.use(authMiddleware);
app.use(router);




db(DB_CONNECTION_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Application is running on http://localhost:${PORT}...`);
        });
    })
    .catch(err => {
        // TODO error handler
        console.log('DB connection error', err.message);
    });
