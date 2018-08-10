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
    location: [ Number, Number ]
});

module.exports = mongoose.model('Location', LocationSchema);