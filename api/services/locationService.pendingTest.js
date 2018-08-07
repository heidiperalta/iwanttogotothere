//'use strict';
const mongoose = require('mongoose');
const locationService = require('./locationService');

const ObjectId = mongoose.Types.ObjectId;
const Location = require('../models/location').Location;

const _testLocationId = ObjectId('5ade4cb3734d1d0b3c2ee666');
const _location = new Location({
    _id: _testLocationId, 
    name: 'Delete me', 
    email: 'delete.me@email.com', 
    password: 'test'
});

/* Test setup and teardown */
beforeAll( () => {
    return mongoose.connect(process.env.DB);
});

afterAll( async () => {
    // Remove test location documents
    await Promise.all([
        Location.findByIdAndRemove(_testLocationId),
    ]);

    return mongoose.disconnect();
});


/* Tests cases */
test('Location service should be defined', () => { expect(locationService).toBeDefined();});

test('Service should return data', async () => {
    const locations = await locationService.getLocations();
    return expect(locations.length).toBeGreaterThan(0);
});

test('Add location throws when called without location data', () => {
    const noLocation = locationService.addLocation;
    return expect(noLocation).toThrow();
});

test('Location is created successfully', () => {
    const testLocation = locationService.addLocation(_location);
    return expect(testLocation).resolves.toHaveProperty('_id', _testLocationId);
});

test('Get location throws when called without location query', () => {
    const noQuery = locationService.getLocation;
    return expect(noQuery).toThrow();
});

test('getLocation returns data', () => {
    const getLocation = locationService.getLocation(_testLocationId);
    return expect(getLocation).resolves.toHaveProperty('_id', _testLocationId);
});

test('Update location throws when called without location id or patch data', () => {
    const noPatch = locationService.updateLocation;
    return expect(noPatch).toThrow();
});

test('Location is updated successfully', () => {
    const newName = 'Updated delete me';
    const updateLocation = locationService.updateLocation(_testLocationId, { name: newName });
    return expect(updateLocation).resolves.toHaveProperty('name', newName);
});

describe('Location is deleted...', () => {

    const tempLocationObj = new Location({
        _id: ObjectId('507f1f77bcf86cd799439011'),
        name: 'temp location', 
        email: 'temp@email.com', 
        password: 'test'
    });

    test('By removing it from the location collection', async () => {

        let tempLocation = await Location.findById(tempLocationObj._id).lean();

        if (!tempLocation) {
            tempLocation = await Location.create(tempLocationObj);
        }
        
        const deleteLocation = await locationService.deleteLocation(tempLocation._id);
        const deletedLocation = await Location.findById(deleteLocation._id).lean();

        return expect(deletedLocation).toBeFalsy();
    });

    test('And archiving it', async () => {
        const archivedLocation = ArchivedLocation.findById(tempLocationObj._id);
        return expect(archivedLocation).resolves.toHaveProperty('_id', tempLocationObj._id);
    });
});
