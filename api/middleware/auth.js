'use strict';
const validator = require('validator');
const { sanitize } = require('express-validator/filter');

exports.validateRegistration = (req, res, next) => {
    const { body } = req;
    const response = { status: 200, messages:[] }

    if (!body.name) {
        response.messages.push('Name is required');
    }

    if (!body.email) {
        response.messages.push('Email cannot be blank');
    }

    if (body.email && !validator.isEmail(body.email)) {
        response.messages.push('Please provide a valid Email Address');
    }

    if (!body.password) {
        response.messages.push('Password is required');
    }
    else {
        body.password = body.password.trim();
    }

    if (body.password && body.password.length < 6) {
        response.messages.push('Password should at least be 6 characters long');
    }
    
    if (!body.passwordConfirmation) {
        response.messages.push('A Password Confirmation must be provided');
    }
    else {
        body.passwordConfirmation = body.passwordConfirmation.trim();
    }

    if ((body.password && body.passwordConfirmation) 
        && (body.password !== body.passwordConfirmation)) {
        response.messages.push('The Password and Confirmation do not match');
    }

    // If the body is invalid, send messages
    if (response.messages.length) {
        response.status = 400;
        res.status(response.status).json(response);
        
        return;
    }

    // Sanitize name and email
    sanitize('name').trim().escape();
    sanitize('email').trim().normalizeEmail();

    next();
}