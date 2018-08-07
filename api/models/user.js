//'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userProps = {
    _id: ObjectId,
    email: {
        type: String,
        required: 'User email is required'
    },
    name: {
        type: String,
        required: 'User name is required'
    },
    auth: {
        type: String
    },
    password: String,
    created_date: {
        type: Date,
        default: Date.now
    },
    modified_date: {
        type: Date
    }
}

const ArchivedUserSchema = {
    ...userProps,
    archived_date: {
        type: Date,
        default: Date.now
    }
}

const UserSchema = new Schema(userProps);

exports.User = mongoose.model('User', UserSchema);
exports.ArchivedUser = mongoose.model('ArchivedUser', ArchivedUserSchema);