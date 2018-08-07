const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const LocationSchema = new Schema({
    _id: Schema.ObjectId,
    user: Schema.ObjectId,
    name: String,
    lat: {
        type: Number,
        required: 'Latitude is required'
    },
    long: {
        type: Number,
        required: 'Longitude is required'
    }
});

module.exports = mongoose.model('Location', LocationSchema);