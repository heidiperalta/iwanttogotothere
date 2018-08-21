'use strict';

// *** TODO: separate routes into files by related tasks

const express = require('express');

const mplacesController = require('../controllers/userController');

const { catchErrors } = require('../helpers/errorHandlers');
const { authorizeCookie, authorizeApiRequest } = require('../helpers/authMiddleware.js');

exports.pageRoutes = (() => {
    const router = express.Router();

    // Locations
    router.get('/', authorizeCookie, mplacesController.home);

    return router;
})();

exports.apiRoutes = (() => {
    const router = express.Router();

    // Api
    router.get('/mplaces', authorizeApiRequest, mplacesController.getUserLocations);
    router.post('/mplaces', authorizeApiRequest, mplacesController.saveLocation);

    return router;
})();
