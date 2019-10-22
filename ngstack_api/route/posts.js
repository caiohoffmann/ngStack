const express = require('express');
const Post = require('../data/post');
const Home = require('../data/home');
const commentsRouter = require('./comments');
const { verifyToken } = require('../utils/verifyToken');
const Response = require('../utils/response');


const router = express.Router();


router.use('/:idPost/comments', verifyToken, getPost, commentsRouter);

function getPost(req, res, next) {
    const id = req.params.idPost;
    req.body.idPost = id;
    next();
}

///POSTS
//Getting All Posts
router.get('/', async (req, res) => {
    const p = await Post.find({}).sort({date:-1}).exec();
    res.json(p);
})

//Get Post by Id
router.get('/:id', async (req, res) => {
    const p = await Post.findById({ _id: req.params.id }).exec();
    res.json(p);
})


//Create New Post
router.post('/', verifyToken, async (req, res) => {
    try {
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
            owner: req.body.owner,
            comments: [{
                content: req.body.content,
                likes: 0,
                replies:[],
                owner: req.body.owner
            }]
        })
        const postResult = await post.save();
        res.json(Response(postResult, null));
    } catch (err) {
        res.json(Response(null, err.errmsg));
    }
})

//Delete a post
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const post = await Post.deleteOne({ _id: req.params.id });
        const home = await Home.deleteOne({ _id: req.params.id });
        if (post.deletedCount !== 0) {
            res.json(Response('deleted successfully', null))
        } else {
            res.json(Response(null, 'Nothing to delete!'))
        }

    } catch (err) {
        res.json(Response(null, err.errmsg));
    }


})

router.patch('/:id', verifyToken, async (req, res) => {
    try {
        const post = await Post.updateOne({ _id: req.params.id }, { $set: req.body });
        const home = await Home.updateOne({ _id: req.params.id }, { $set: req.body });
        res.json(Response('Updated Successfully', null));
    } catch (err) {
        res.json(Response(null, err.errmsg));
    }
})





module.exports = router;