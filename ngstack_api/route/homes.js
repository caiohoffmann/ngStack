const express = require('express');
const Home = require('../data/home');
const { verifyToken } = require('../utils/verifyToken');
const response = require('../utils/response');

const router = express.Router();


//Home

//Getting All Home
router.get('/', async (req, res) => {
    const h = await Home.find({}).sort({date:-1}).exec();
    res.json(response(h,null));
})

//Get Homes Paged
router.get('/:page', async(req,res)=>{
    const skip = (req.params.page-1)*5;
    const p = await Home.find().sort({date:-1}).skip(skip).limit(5);
    res.json(response(p,null));
})

//Get Homes Tagged
router.post('/tags', async(req,res)=>{
    const query = [];

    for(let i=0; i<req.body.tags.length; i++){
        query.push({tags:req.body.tags[i]});
    }

   
    const p = await Home.find({$or:query}).sort({date:-1}).exec();
    res.json(response(p,null));
})

module.exports = router;

