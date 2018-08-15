const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { validateRegistration } = require('../middleware/auth');


router.post('/register',  validateRegistration, authController.register);
router.post('/authenticate', authController.authenticate);


module.exports = router;