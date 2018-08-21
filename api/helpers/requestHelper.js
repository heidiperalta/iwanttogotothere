'use strict';
const express = require('express');

let app = express();
app.request.__proto__.sendMplaceResponse = function (status, messages, data) { console.log('hi');};

exports.sendResponse = (res, response) => {
    const response = { status: 200, messages: [] };

    res.status(response.status).json(response);
}