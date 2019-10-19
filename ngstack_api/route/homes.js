const express = require('express');
const Home = require('../data/home');
const { verifyToken } = require('../utils/verifyToken');

const router = express.Router();


//Home
//Getting All Home
router.get('/', async (req, res) => {
    const h = await Home.find({}).exec();
    res.json(h);
})

//Get Homes Paged
router.get('/:page', verifyToken, async(req,res)=>{
    const skip = (req.params.page-1)*5;
    const p = await Home.find().skip(skip).limit(5);
    res.json(p);
})

module.exports = router;

