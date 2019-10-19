const express = require('express');

const { verifyToken } = require('../utils/verifyToken');

const router = express();

router.get('/users', verifyToken, async (req, res) => {
    const list = await User.find({}).exec();
    res.json(list);
});


router.post('users/userPost', verifyToken, async (req, res) => {
    const u = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });
    const user = await u.save();
    res.json(user);
});

router.delete('/users/:id', verifyToken, async (req, res) => {
    let userId = req.params.id;
    const usser = await User.deleteOne({ _id: userId });
    res.json({ msg: 'successfuly deleted' })
});

module.exports = router;