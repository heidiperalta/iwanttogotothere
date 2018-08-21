'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./api/routes/authRouter');
const { pageRoutes, apiRoutes } = require('./api/routes/mplaceRouter');

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

app.use(cookieParser());
app.use(express.json());

app.use('/', authRoutes);
app.use('/mplaces', pageRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`iwtgtt Api server listening on port ${port}`);
});