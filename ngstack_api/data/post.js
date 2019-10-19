const mongoose = require('mongoose');

const Posts = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    tags: [String],
    date: { type: Date, default: Date.now },
    comments: [{
        content: { type: String, required: true },
        like: String,
        replies: [{
            content: String,
            likes: Number,
            owner: String
        }],
        updated: { type: Date, default: Date.now }
    }]
});




module.exports = mongoose.model('post', Posts);