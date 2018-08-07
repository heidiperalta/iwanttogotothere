'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userService = require('../services/userService');


const getUsers = async (req, res) => {
    // Testing async await for jest
    const users = await userService.getUsers();

    res.send(users);
    
};

const register = async (req, res) => {
    let passwordHash;

    /* TODO list: 
        - create email confirmation flow
    */
    if (!req.body || !req.body.email) {
        return res.status(403).send();
    }

    const exists = await userService.getUser({ email: req.body.email });
    
    if (exists) {
        return res.status(400).send('User already exists');
    }

    if (req.body.password) {
        passwordHash = bcrypt.hashSync(req.body.password, 8);
    }

    try {
        const user = await userService.addUser({
            email: req.body.email,
            password: passwordHash,
            name: req.body.name
        });

        let token = jwt.sign({ id: user._id }, process.env.REGISTRATION_SECRET, { expiresIn: 86400 });
        
        req.user = token;

        res.send({ auth: true, token: token });
    }
    catch (err) {
        res.status(500).send(err);
    }

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
    getUsers,
    register,
    authenticate
}
