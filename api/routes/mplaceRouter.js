'use strict';

// *** TODO: separate routes into files by related tasks

const express = require('express');

const mplacesController = require('../controllers/mplaceController');

const { catchErrors } = require('../helpers/errorHandlers');
const { authorizeCookie, authorizeApiRequest } = require('../helpers/authMiddleware.js');

/*
*   Page Routes
*/
exports.pageRoutes = (() => {
    const router = express.Router();

    // MPlaces
    router.get('/', authorizeCookie, mplacesController.home);

    return router;
})();

/*
*   API endpoints
*/
exports.apiRoutes = (() => {
    const router = express.Router();

    router.get('/mplaces', authorizeApiRequest, mplacesController.getUserMPlaces);
    router.post('/mplaces', authorizeApiRequest, mplacesController.saveMPlace);

    return router;
})();
