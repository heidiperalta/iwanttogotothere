'use strict';

// *** TODO: separate routes into files by related tasks

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const locationController = require('../controllers/locationController');

const { catchErrors } = require('../middleware/errorHandlers');

// Users
router.get('/users', catchErrors(userController.getUsers));

// Auth
router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);

// Locations
router.get('/locations/:current', locationController.getUserLocations);
router.post('/locations', catchErrors(locationController.saveLocation));


module.exports = router;