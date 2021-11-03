// Import third-party modules 
const router = require('express').Router();

// Import local modules
const authController = require('./controllers/authController.js');
const homeController = require('./controllers/homeController.js');

// Import local modules (controllers)
// for URLs starting with http://localhost:3000/ .....
router.use('/', homeController);
// for URLs starting with http://localhost:3000/user/ .....
router.use('/user', authController);



module.exports = router;