const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MPlaceSchema = new Schema({
    user: Schema.ObjectId,
    name: {
        type: String,
        required: 'Location name is required'
    },
    notes: String,
    placeId: String,
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

exports.projectionFields = 'name notes placeId location';
exports.Location = mongoose.model('Location', MPlaceSchema);