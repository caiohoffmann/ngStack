const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: String,
    gender: String,
    posts: [{
        title: String,
        numberComments: Number,
        date: Date
    }],
    badge: Number
});

User.index({ email: 1, password: 1 });

module.exports = mongoose.model('user', User);