//'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const User = require('../models/user').User;
const ArchivedUser = require('../models/user').ArchivedUser;


const getUsers = (query) => {
    const q = query || null;

    throw new Error('WHOOPS');

    return User.find(q);
}

const getUser = (query) => {
    if (!query) 
        throw 'No query specified';

    return User.findOne(query);
}

const addUser = user => {
    if (!user) 
        throw 'No user specified';

    user._id = user._id || ObjectId();

    return User.create(user);
}

const updateUser = (userId, userPatch) => {
    // Return updated document on findByIdAndUpdate
    const options = {
        new: true
    };

    if (!userId || !userPatch) {
        throw 'Did not receive data to update user with';
    }

    return User.findByIdAndUpdate(userId, userPatch, options);
}

const deleteUser = async (userId) => {
    if (!userId) {
        throw 'Did not receive user to delete';
    }

    let removedUser;
    
    // First we archive, then remove the document, any errors throw to caller
    const user = await User.findById(userId).lean();
    const archivedUser = await ArchivedUser.create(user);

    try {
        removedUser = await User.findByIdAndRemove(userId);
    } 
    catch (error) {
        ArchivedUser.findByIdAndRemove(userId);
        throw error;
    }

    return removedUser;
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
};