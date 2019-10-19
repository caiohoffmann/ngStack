const express = require('express');

const commentsRouter = require('./comments');

const router = express.Router();

router.use('/:idPost/comments', getPost, commentsRouter);

//Find the post in the database and pass the post object in the request body for the comment router
function getPost(req, res, next) {
    next();
}

///posts
router.get('/posts', async (req, res) => {
    const p = await Post.find({}).exec();
    res.json(p);
})

router.post('/posts', async (req, res) => {
    const p = new Post({
        title: req.body.title,
        tags: req.body.tags,
        owner: req.body.owner,
        date: req.body.date
    })
    const post = await p.save();
    res.json(post);
})


module.exports = router;