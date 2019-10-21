const express = require('express');
const jwt = require("jsonwebtoken");

const User = require('../data/user');
const jwstkey = require('../utils/key');


const router = express.Router();

router.post('/login', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        next('Not valid');
    }
    const user = await User.findOne({ email: req.body.email, password: req.body.password }).exec();
    const pay = {
        "email": user.email,
        "id": user._id,
        "name": user.name,
        "picture": user.picture
    };
    jwt.sign(pay,
        jwstkey.jwt, (err, data) => {
            if (err) throw err;

            res.header('ngstackauth', data);
            res.json({ msg: 'success', token: data });

        }
    );
});

router.post('/signin', async (req, res) => {
    try {


        const u = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });

        const user = await u.save();
        jwt.sign({
            "email": u.email,
            "id": u._id,
            "name": u.name,
            "picture": u.picture
        },
            jwstkey.jwt, (err, data) => {
                if (err) throw err;

                res.header('ngstackauth', data);
                res.json({ msg: 'success', token: data });

            }
        );
        //res.json(response(user));
    } catch (err) {
        throw err;
    }
});


module.exports = router;