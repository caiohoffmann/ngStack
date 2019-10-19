const mongoose = require('mongoose');

const Home = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    tags: [String],
    owner: {
        name: { type: String, required: true },
        badge: Number
    },
    date: { type: Date, default: Date.now },
});

Home.index({ title: 1, 'owner.name': 1 }, { unique: true });
Home.index({ tags: 1 });

module.exports = mongoose.model('home', Home);