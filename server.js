'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./api/routes/iwtgttRouter');


if (process.env.NODE_ENV === 'local') {
    require('dotenv').config({ path: 'variables.env' });
}

const app = express();
const port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, err => {
    if (err)
        // TODO: log

    console.log('I connected to Mongo!');
}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`iwtgtt Api server listening on port ${port}`);
});