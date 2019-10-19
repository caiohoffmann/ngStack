const express = require('express');

const { verifyToken } = require('../utils/verifyToken');
const User=require('../data/user');
const router = express();

router.get('/', verifyToken, async (req, res) => {
    const list = await User.find({}).exec();
    res.json(list);
});


router.post('/', verifyToken, async (req, res) => {
    const u = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });
    const user = await u.save();
    res.json(user);
});
//edit
router.patch('/:id',verifyToken,async(req,res)=>{
    let id=req.params.id;
    let newtype=req.body.type;
    let myquery={
        _id:id
    }


})

router.delete('/:id', verifyToken, async (req, res) => {
    let userId = req.params.id;
    const usser = await User.deleteOne({ _id: userId });
    res.json({ msg: 'successfuly deleted' })
});

module.exports = router;