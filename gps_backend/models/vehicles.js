const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
    title: {
        type: Number,
        required: true
    },
    start_location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    end_location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    values: {
        type: [
            {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        }
        ],
        required: true
    },
    speed: {
        type: String,
        required: true
    },
}, { timestamps: true });

const detail = mongoose.model('Individual_details', detailSchema);
module.exports = detail;
