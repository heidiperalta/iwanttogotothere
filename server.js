'use strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./api/routes/iwtgttRouter');
const authRoutes = require('./api/routes/authRouter');

if (process.env.NODE_ENV === 'local') {
    require('dotenv').config({ path: 'variables.env' });
}

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, err => {
    if (err) {
        console.log('DB error:', err);
    }
    else {
        console.log('I connected to Mongo!');
    }        
}); 

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', routes);

app.use('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
})

app.listen(port, () => {
    console.log(`iwtgtt Api server listening on port ${port}`);
});