'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user').User;

const register = async (req, res) => {
    const response = { status: 200, messages: [], data: [] };
    /* TODO list: 
        - create email confirmation flow
    */
    let passwordHash;
    const salt  = bcrypt.genSaltSync();

    if (req.body.password) {
        passwordHash = bcrypt.hashSync(req.body.password, salt);
    }

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        salt: salt
    })
    .catch( err => {
        if (err.message.includes('$email_1 dup key')) {
            response.status = 400;
            response.messages.push('An account with this email already exists, forgot password?');
        }
        else {
            response.status = 500;
            response.messages.push(err.message);
        }
    });

    if (user) {
        let token = jwt.sign({ id: user._id }, 
            process.env.REGISTRATION_SECRET, { expiresIn: 86400 });
        
        req.user = token;
    }

    res.status(response.status).json(response);
}

const authenticate = (req, res) => {
    let creds;

    if (req.body && req.body.email) {
        creds = { email: req.body.email, ayayay: req.body.password };
    }
    
    // get user from the database with that email
    // check if passwords match
    // return jwt to be used back and forth 

    res.json(creds);
}


module.exports = {
    register,
    authenticate
}
