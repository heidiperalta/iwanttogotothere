const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const LocationSchema = new Schema({
    user: Schema.ObjectId,
    name: {
        type: String,
        required: 'Location name is required'
    },
    notes: String,
    placeId: String,
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