'use strict';
const Location = require('../models/location');


const saveLocation = async (req, res) => {
    // Save a location on the locations collection with the user
    // take user id from request (logged-in user)

    if (!req.auth || !req.auth.user) {
        res.send('403', 'Must be logged in to save the location');
    }

    if (!req.body || !req.body.lat || !req.body.long || !req.body.name) {
        res.send('400', 'Location name, latitude and longitude are required');
    }

    let location = {
        user: req.auth.user,
        name: req.body.name,
        lat: req.body.lat,
        long: req.body.long
    };

    let newLocation = await Location.create(location);

    res.send(newLocation);
}

module.exports = {
    saveLocation 
}