'use strict';

// *** TODO: separate routes into files by related tasks

const express = require('express');
const router = express.Router();

const locationController = require('../controllers/locationController');

const { catchErrors } = require('../middleware/errorHandlers');


// Locations
router.get('/locations', locationController.getUserLocations);
router.post('/locations', catchErrors(locationController.saveLocation));


module.exports = router;