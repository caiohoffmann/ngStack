const mongoose = require('mongoose');

const Comments = new mongoose.Schema({
    content: { type: String, required: true },
    like: String,
    replies: {
        content: String,
        likes: Number,
        owner: String
    },
    updated: { type: Date, default: Date.now }
});



module.exports = mongoose.model('comment', Comments);