const mongoose = require('mongoose');

const Posts = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    tags: [String],
    owner: {
        name: { type: String, required: true },
        badge: Number
    },
    date: { type: Date, default: Date.now },
});

Posts.index({ title: 1, 'owner.name': 1 }, { unique: true });

module.exports = mongoose.model('post', Posts);