const express = require('express');

const { verifyToken } = require('../utils/verifyToken');
const User = require('../data/user');
const router = express();
const response = require('../utils/response');


//router.use('/:userId/user', getUser, replyRouter);


//###################################################

router.get('/', verifyToken, async (req, res) => {
    const user = await User.find({}).exec();
    res.json(response(user));


    //  res.json(response(comment));
});

router.get('/:id', verifyToken, async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).exec();
    res.json(response(user));


    //  res.json(response(comment));
});

//###########################################################

router.post('/', async (req, res) => {
    try {


        const u = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            picture: req.body.picture
        });

        const user = await u.save();
        res.json(response(user));
    } catch (err) {
        throw err;
    }
});

//################################################################
//edit
// router.patch('/:id', verifyToken, async (req, res) => {
//     let id = req.params.id;
//     let newtype = req.body.name;
//     let myquery = {
//         _id: id
//     };

//     const newValue = { $set: { name: newtype } };

//     const user = await User.updateOne(myquery, newValue, (err, success) => {
//         if (err) throw err;

//         res.json(response(user))
//     })

// })

//#######################################################################

router.delete('delete/:id', verifyToken, async (req, res) => {
    let userId = req.params.id;
    const user = await User.deleteOne({ _id: userId });
    res.json(response(user))
});
//########################################

router.put('/:id', async (req, res) => {
    try {
        const u = ({

            password: req.body.password,
            name: req.body.name,
            picture: req.body.picture
        });

        let userId = req.params.id;

        let databd = {
            _id: userId
        }
        let newdata = { $set: u };

        const user = await User.updateOne(databd, newdata);



        res.json(response(user));
    } catch (err) {
        throw err;
    }
});

module.exports = router;