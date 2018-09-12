'use strict';

const path = require('path');
const { Location, projectionFields } = require('../models/mplace');


const responseBody = { status: 200, messages: [], data: [] };

const setResponse = (res, status, message) => {
    responseBody.status = status || 200;

    if (responseBody.status === 200)
        responseBody.messages.length = 0;

    if (message) 
        responseBody.messages.push(message);
    
    res.status(responseBody.status).json(responseBody);
}

/*
* Route Handlers
*/

const home = (req, res) => {
    if (!req.user) {
        setResponse(res, 403, `Must be logged in to access y'places!`);        
        return;
    }
    res.sendFile(path.resolve('./public/index.html'));
}


// Save a location on the locations collection with the user
// take user id from request (logged-in user)
const saveMPlace = async (req, res) => {
    if (!req.user) {
        setResponse(res, 403, `Must be logged in to save y'places!`);        
        return;
    }

    if (!req.body || !req.body.lat || !req.body.lng || !req.body.name) {
        setResponse(res, 400, 'MPlace name, latitude and longitude are required');        
        return;
    }

    let location = {
        user: req.user,
        placeId: req.body.placeId,
        name: req.body.name,
        notes: req.body.notes,
        location: [ req.body.lng, req.body.lat ]
    };

    const newMPlace = await MPlace.create(location)
        .catch( error => responseBody.messages.push(error));

    if (newMPlace) {
        responseBody.data.push({ mplaces: [ newMPlace ]});
        setResponse(res);
    }
    else {
        setResponse(res, 400);
    }

}


// Get user from request
// get user's nearby locations from database
// return x amonut of locations
const getUserMPlaces = async (req, res) => {
    const { long, lat } = req.query; 
    
    if (!req.user) {
        setResponse(res, 403, `Must be logged in to access y'places!`);        
        return;
    }

    if (!long || !lat) {
        setResponse(res, 400, `Longitude and latitude are required`); 
        return;
    }

    const query = {
        user: req.user,
        location: {
            $near: {
                $geometry: { type: 'Point', coordinates: [ long, lat ]},
                $maxDistance: 100000
            }
        }
    }

    const mplaces = await Location
        .find(query, projectionFields)
        .limit(10)
        .catch( error => responseBody.messages.push(error));

    if (mplaces && mplaces.length) {
        responseBody.data.push({ mplaces: mplaces });
        setResponse(res);
    }
    else {
        setResponse(res, 400);
    }

}

module.exports = {
    saveMPlace,
    getUserMPlaces,
    home
}