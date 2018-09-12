'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user').User;


/* TODO list: 
    - create email confirmation flow
*/
const register = async (req, res, next) => {
    const response = { status: 200, messages: [], data: [] };
    const salt  = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        salt: salt
    })
    .catch( error => {
        // Email unique validation
        if (error.message.includes('$email_1 dup key')) {
            response.status = 400;
            response.messages.push('An account with this email already exists, forgot password?');
        }
        else {
            response.status = 500;
            response.messages.push(error.message);
        }
    });

    // Return error message from catch block
    if (!user) {
        res.status(response.status).json(response);
        return;
    }

    let token = jwt.sign({ user: user._id }, 
        process.env.AUTH_SECRET, { expiresIn: 86400 });
    
    req.user = token;

    res.redirect('/mplaces');
}

/*
 * Login handler
*/
const login = async (req, res) => {
    const response = { status: 200, messages: [], data: {} };

    const unauthorizedRes = () => {
        response.status = 403;
        response.messages.push('Invalid email or password!');
        res.status(response.status).json(response);
    } 
    
    const user = await User.findOne({ email: req.body.email })
        .catch( error => console.log(error) );

    // User is not registered
    if (!user) {
        return unauthorizedRes();
    }

    const { email, name, id } = user;

    if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            { id: user._id }, 
            process.env.AUTH_SECRET, 
            { expiresIn: 86400 }
        );
        
        response.data.token = token;
        response.data.user = { email, name, id };
    }
    // Wrong password
    else {
        return unauthorizedRes();
    }
    
    res.status(response.status).json(response);
}


module.exports = {
    register,
    login
}
