const express = require('express');

const Post = require('../data/post');
const response = require('../utils/response');

const router = express.Router();

router.post('/', verifyReply, async (req, res) => {
    try {
        const p = await Post.updateOne({ _id: req.body.post._id, "comments.idContent": req.body.comment.idComment },
            {
                $push: {
                    "comments.$.replies": {
                        content: req.body.content,
                        owner: req.body.username
                    }
                }
            });
        res.json(response(p));
    } catch (err) {
        throw err;
    }
});

router.patch('/:idReply', async (req, res) => {
    try {
        const p = await Post.updateOne({ _id: req.body.post._id, "comments.idContent": req.body.comment.idComment, "comments.replies.idReply": req.params.idReply },
            {
                $set: {
                    "comments.$.replies.$": {
                        content: req.body.content
                    }
                }
            });
        res.json(response(p));
    } catch (err) {
        throw err;
    }
});

router.delete('/:idReply', async (req, res) => {
    try {
        const p = await Post.updateOne({ _id: req.body.post._id, "comments.idContent": req.body.comment.idComment, "comments.replies.idReply": req.params.idReply },
            {
                $pop: {
                    "comments.$.replies.$": 1
                }
            });
        res.json(response(p));
    } catch (err) {
        throw err;
    }
});

function verifyReply(req, res, next) {
    if (!req.body.content || !req.body.owner) {
        return next('Request body incomplete');
    }
    next();
}

module.exports = router;