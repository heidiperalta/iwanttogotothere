'use strict';

const path = require('path');
const Location = require('../models/location');

const home = (req, res) => {
    if (!req.user) {
        response.status = 403;
        response.messages.push(`Must be logged in to access y'places!`);

        res.status(response.status).json(response);
        return;
    }

    res.sendFile(path.resolve('./public/index.html'));

}

const saveLocation = async (req, res) => {
    const response = { status: 200, messages: [], data: [] };
    // Save a location on the locations collection with the user
    // take user id from request (logged-in user)

    if (!req.user) {
        res.status('403').send('Must be logged in to save the location');
        return;
    }

    if (!req.body || !req.body.lat || !req.body.lng || !req.body.name) {
        res.status('400').send('Location name, latitude and longitude are required');
        return;
    }

    let location = {
        user: req.user,
        placeId: req.body.placeId,
        name: req.body.name,
        notes: req.body.notes,
        location: [ req.body.lng, req.body.lat ]
    };

    const newLocation = await Location.create(location)
        .catch( error => console.log(error));

    if (newLocation) {
        response.data.push({ mplaces: [ newLocation ]});
    }

    res.status(response.status).json(response);
}

// Get user from request
// get user's nearby locations from database
// return x amonut of locations
const getUserLocations = async (req, res) => {
    const response = { status: 200, messages: [], data: [] };
   
    if (!req.user) {
        response.status = 403;
        response.messages.push(`Must be logged in to access y'places!`);
        res.status(response.status).json(response);
        return;
    }

    const query = {
        user: req.user,
        location: {
            $geoWithin: {
                $box: [
                    [req.query.west, req.query.south], 
                    [req.query.east, req.query.north]
                ]
            }
        }
    }

    // TODO: notify of error on catch
    const locations = await Location.find(query)
        .catch( error => console.log(error));

    if (locations) {
        response.data.push({ mplaces: locations });
    }

    res.status(response.status).json(response);
}

module.exports = {
    saveLocation,
    getUserLocations,
    home
}