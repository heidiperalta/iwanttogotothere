//'use strict';
require('dotenv').config({ path: 'variables.env' });

const mongoose = require('mongoose');
const userService = require('./userService');

const ObjectId = mongoose.Types.ObjectId;
const User = require('../models/user').User;
const ArchivedUser = require('../models/user').ArchivedUser;

const _testUserId = ObjectId('5ade4cb3734d1d0b3c2ee553');
const _tempUserId = ObjectId('507f1f77bcf86cd799439011');
const _user = new User({
    _id: _testUserId, 
    name: 'Delete me', 
    email: 'delete.me@email.com', 
    password: 'test'
});

/* Test setup and teardown */
beforeAll( () => {
    return mongoose.connect(process.env.DB);
});

afterAll( async () => {
    // Remove test user documents
    await Promise.all([
        User.findByIdAndRemove(_testUserId),
        User.findByIdAndRemove(_tempUserId),
        ArchivedUser.findByIdAndRemove(_tempUserId),
    ]);

    return mongoose.disconnect();
});


/* Tests cases */
test('User service should be defined', () => { expect(userService).toBeDefined();});

test('Service should return data', async () => {
    const users = await userService.getUsers();
    return expect(users.length).toBeGreaterThan(0);
});

test('Add user throws when called without user data', () => {
    const noUser = userService.addUser;
    return expect(noUser).toThrow();
});

test('User is created successfully', () => {
    const testUser = userService.addUser(_user);
    return expect(testUser).resolves.toHaveProperty('_id', _testUserId);
});

test('Get user throws when called without user query', () => {
    const noQuery = userService.getUser;
    return expect(noQuery).toThrow();
});

test('getUser with query returns data', () => {
    const getUser = userService.getUser({ email: 'delete.me@email.com' });
    return expect(getUser).resolves.toHaveProperty('_id', _testUserId);
});

test('Update user throws when called without user id or patch data', () => {
    const noPatch = userService.updateUser;
    return expect(noPatch).toThrow();
});

test('User is updated successfully', () => {
    const newName = 'Updated delete me';
    const updateUser = userService.updateUser(_testUserId, { name: newName });
    return expect(updateUser).resolves.toHaveProperty('name', newName);
});

describe('User is deleted...', () => {

    const tempUserObj = new User({
        _id: ObjectId('507f1f77bcf86cd799439011'),
        name: 'temp user', 
        email: 'temp@email.com', 
        password: 'test'
    });

    test('By removing it from the user collection', async () => {

        let tempUser = await User.findById(tempUserObj._id).lean();

        if (!tempUser) {
            tempUser = await User.create(tempUserObj);
        }
        
        const deleteUser = await userService.deleteUser(tempUser._id);
        const deletedUser = await User.findById(deleteUser._id).lean();

        return expect(deletedUser).toBeFalsy();
    });

    test('And archiving it', async () => {
        const archivedUser = ArchivedUser.findById(tempUserObj._id);
        return expect(archivedUser).resolves.toHaveProperty('_id', tempUserObj._id);
    });
});
