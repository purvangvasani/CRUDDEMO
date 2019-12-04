const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    name: { type: String },
    description: { type: String },
    category: { type: String },
    status: { type: String }
}, {
    collection: 'post'
}, {
    timestamps: {
        createdAt: 'created_at'
    }
}, {
    timestamps: {
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('post', Post);