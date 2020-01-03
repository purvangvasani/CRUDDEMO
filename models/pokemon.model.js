const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pokemon = new Schema({
    name: { type: String },
    height: { type: Number },
    weight: { type: Number },
    description: { type: String },
    imagePath: { type: String },
    imageName: { type: String }
}, {
        collection: 'pokemon'
    }, {
        timestamps: {
            createdAt: 'created_at'
        }
    }, {
        timestamps: {
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('pokemon', Pokemon);