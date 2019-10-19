const express = require('express');
const Post = require('../data/post');
const Home = require('../data/home');
const commentsRouter = require('./comments');
const { verifyToken } = require('../utils/verifyToken');

const router = express.Router();

router.use('/:idPost/comments', getPost, commentsRouter);

//Find the post in the database and pass the post object in the request body for the comment router
function getPost(req, res, next) {
    next();
}

///POSTS
//Getting All Posts
router.get('/', async (req, res) => {
    const p = await Post.find({}).exec();
    res.json(p);
})

//Create New Post
router.post('/', async (req, res) => {
    const p = new Post({
        title: req.body.title,
        tags: req.body.tags,
        owner: req.body.owner,
    })
    const post = await p.save();
    res.json(post);
})

//Delete a post
router.delete('/:id', async(req,res)=>{
    const post = await Post.deleteOne({_id: req.params.id});
    res.json({msg: 'posts deleted successfuly'})
})




module.exports = router;