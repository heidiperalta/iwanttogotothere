'use strict';
const Location = require('../models/location');


const saveLocation = async (req, res) => {
    // Save a location on the locations collection with the user
    // take user id from request (logged-in user)

    if (!req.auth || !req.auth.user) {
        res.status('403').send('Must be logged in to save the location');
        return;
    }

    if (!req.body || !req.body.lat || !req.body.lng || !req.body.name) {
        res.status('400').send('Location name, latitude and longitude are required');
        return;
    }

    let location = {
        user: req.auth.user,
        placeId: req.body.placeId,
        name: req.body.name,
        notes: req.body.notes,
        location: [ req.body.lng, req.body.lat ]
    };

    let newLocation = await Location.create(location);

    res.send(newLocation);
}

const getUserLocations = async (req, res) => {
    // Get user from request
    // get user's nearby locations from database
    // return x amonut of locations
    if (!req.auth || !req.auth.user) {
        res.status('403').send('Must be logged in to save the location');
        return;
    }

    const query = {
        user: req.auth.user,
        location: {
            $geoWithin: {
                $box: [
                    [req.query.west, req.query.south], 
                    [req.query.east, req.query.north]
                ]
            }
        }
    }

    const locations = await Location.find(query)
        .catch( error => console.log(error));

    res.send(locations);
}

module.exports = {
    saveLocation,
    getUserLocations
}