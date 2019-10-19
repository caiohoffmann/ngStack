const express = require('express');
const Post = require('../data/post');
const Home = require('../data/home');
const commentsRouter = require('./comments');
const jwt = require("jsonwebtoken");
const { verifyToken } = require('../utils/verifyToken');


const router = express.Router();
const jwstkey = require('../utils/key');


router.use('/:idPost/comments', getPost, commentsRouter);

//Find the post in the database and pass the post object in the request body for the comment router
function getPost(req, res, next) {
    const post = Post.findOne({_id: req.params.idPost});
    res.json(post);
}

///POSTS
//Getting All Home
router.get('/homes', async (req, res) => {
    const h = await Home.find({}).exec();
    res.json(h);
})

//Getting All Posts
router.get('/posts', verifyToken, async (req, res) => {
    const p = await Post.find({}).exec();
    res.json(p);
})

//Get Homes Paged
router.get('/homes/:page', verifyToken, async(req,res)=>{
    const skip = (req.params.page-1)*5;
    const p = await Home.find().skip(skip).limit(5);
    res.json(p);
})

//Get Post by Id
router.get('/:id', verifyToken, async(req,res)=>{
    const p = await Post.findById({_id: req.params.id}).exec();
    res.json(p);
})


//Create New Post
router.post('/', verifyToken, async (req, res) => {
    const home = new Home({
        title: req.body.title,
        tags: req.body.tags,
        owner: req.body.owner,
    })
    const homeResult = await home.save();
    const post = new Post({
        _id: homeResult._id,
        title: req.body.title,
        tags: req.body.tags,
        comments: []
    })
    const postResult = await post.save();
    res.json(postResult);
})

//Delete a post
router.delete('/:id', verifyToken,  async(req,res)=>{
    await Post.deleteOne({_id: req.params.id});
    await Home.deleteOne({_id: req.params.id});
    res.json({msg: 'posts deleted successfuly'})
})





module.exports = router;