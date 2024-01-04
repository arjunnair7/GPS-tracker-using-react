const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
    start: {
        address: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    finish: {
        address: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    }
}, { timestamps: true });

const Trips = mongoose.model('trip', detailSchema);
module.exports = Trips;
