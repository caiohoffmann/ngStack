const mongoose = require('mongoose');

const Posts = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    tags: [String],
    date: { type: Date, default: Date.now },
    comments: [{
        idContent: { type: String, default: mongoose.Types.ObjectId },
        content: { type: String, required: true },
        like: Number,
        replies: [{
            idReply: { type: String, default: mongoose.Types.ObjectId },
            content: { type: String, required: true },
            likes: Number,
            owner: { type: String, required: true },
            updated: { type: Date, default: Date.now }
        }],
        owner: { type: String, required: true },
        updated: { type: Date, default: Date.now }
    }]
});

Posts.index({ title: 1, 'owner.name': 1 }, { unique: true });


module.exports = mongoose.model('post', Posts);