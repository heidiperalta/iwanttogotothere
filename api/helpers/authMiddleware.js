'use strict';
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { sanitize } = require('express-validator/filter');


exports.validateLogin = (req, res, next) => {
    const { body } = req;
    const response = { status: 200, messages: [] }

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

    // If the body is invalid, send messages
    if (response.messages.length) {
        response.status = 400;
        res.status(response.status).json(response);
        
        return;
    }

    // Sanitize email
    sanitize('email').trim().normalizeEmail({
        gmail_remove_dots: false
    });

    next();
}

exports.validateRegistration = (req, res, next) => {
    const { body } = req;
    const response = { status: 200, messages: [] }

    if (!body.name) {
        response.messages.push('Name is required');
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

    sanitize('name').trim().escape();
    next();
}

exports.authorizeCookie = (req, res, next) => {
    const token = req.cookies['token'];

    authorize(req, res, next, token, (res) => { 
        res.status(403).redirect('/login') ;
    });
}

exports.authorizeApiRequest = (req, res, next) => {
    const token = req.headers['x-access-token'];

    authorize(req, next, token, (error) => { 
        res.status(403).send(`Unauthorized request ${error}`);
    });
}

const authorize = (req, next, token, errorHandlerFn) => {
    if (!token) {
        errorHandlerFn();
        return;
    }
    
    jwt.verify(token, process.env.AUTH_SECRET, (error, verifiedToken) => {
        if (error || !verifiedToken) {
            errorHandlerFn(error);
            return;
        }
        
        req.user = verifiedToken.id;
        next();
    });
}
