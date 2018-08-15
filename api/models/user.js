//'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProps = {
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: 'User name is required'
    },
    auth_accounts: [],
    password: {
        type: String,
        required: 'Password is required'
    },
    salt: String,
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