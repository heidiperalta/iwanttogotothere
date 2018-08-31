'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./api/routes/authRouter');
const path = require('path');
const { apiRoutes } = require('./api/routes/mplaceRouter');

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
app.use(express.static('./mapp/build'));

app.use('/', (req, res) => {
    res.sendFile(path.resolve('./mapp/build/index.html'));
});
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`iwtgtt Api server listening on port ${port}`);
});