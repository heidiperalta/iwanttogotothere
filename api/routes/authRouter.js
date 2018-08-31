const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../helpers/authMiddleware');


router.post('/login', validateLogin, authController.login);
router.post('/register',  [ validateLogin, validateRegistration ], authController.register);


module.exports = router;