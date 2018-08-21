const express = require('express');
const path = require('path');
const router = express.Router();

const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../helpers/authMiddleware');


router.get('/login', (req, res) => {
    res.sendFile(path.resolve('./public/login.html'));
});
router.post('/login', validateLogin, authController.login);

router.get('/register', (req, res) => {
    res.sendFile(path.resolve('./public/login.html'));
});
router.post('/register',  [ validateLogin, validateRegistration ], authController.register);


module.exports = router;