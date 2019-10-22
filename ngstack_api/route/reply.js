const express = require('express');

const Post = require('../data/post');
const response = require('../utils/response');

const router = express.Router();

router.post('/', verifyReply, async (req, res) => {
    try {
        const p = await Post.findOneAndUpdate({ _id: req.body.idPost, "comments._id": req.body.idComment },
            {
                $push: {
                    "comments.$.replies": {
                        content: req.body.content,
                        owner: req.body.owner
                    }
                }
            }, { new: true }).exec();
        const reply = p.comments.filter((c, i, arr) => {
            return c.id === req.body.idComment
        })[0].replies.slice(-1).pop();
        res.json(response(reply));
    } catch (err) {
        throw err;
    }
});

router.get('/:idReply', async (req, res) => {
    const reply = await Post.findOne({
        _id: req.body.idPost,
        'comments._id': req.body.idComment,
        'comments.replies._id': req.params.idReply
    });
    const nreply = reply.comments.filter((c, i, arr) => {
        return c.id === req.body.idComment
    })[0].replies.filter((r, i, arr) => {
        return r.id === req.params.idReply
    });
    res.json(response(nreply));
});

router.get('/', async (req, res) => {
    try {
        const reply = await Post.findOne({
            _id: req.body.idPost,
            'comments._id': req.body.idComment
        }).exec();
        const nreply = reply.comments.filter((c, i, arr) => {
            return c.id === req.body.idComment
        })[0];
        res.json(response(nreply));
    } catch (err) {
        next(err);
    }
});

router.patch('/:idReply', async (req, res) => {
    try {
        const p = await Post.findOneAndUpdate({
            _id: req.body.idPost,
            'comments.replies._id': req.params.idReply
        },
            { "$set": { "comments.$[comment].replies.$[reply].content": req.body.content } },
            {
                "arrayFilters": [
                    { "comment._id": req.body.idComment },
                    { "reply._id": req.params.idReply }
                ],
                new: true
            });
        const reply = p.comments.filter((c, i, arr) => {
            return c.id === req.body.idComment
        })[0].replies.filter((r, i, arr) => {
            return r.id === req.params.idReply
        });
        res.json(response(reply));
    } catch (err) {
        throw err;
    }
});

router.patch('/:idReply/like', async (req, res) => {
    try {
        const p = await Post.findOneAndUpdate({
            _id: req.body.idPost
        },
            { $inc: { "comments.$[comment].replies.$[reply].likes": 1 } },
            {
                "arrayFilters": [
                    { "comment._id": req.body.idComment },
                    { "reply._id": req.params.idReply }
                ],
                new: true
            });
        const reply = p.comments.filter((c, i, arr) => {
            return c.id === req.body.idComment
        })[0].replies.filter((r, i, arr) => {
            return r.id === req.params.idReply
        });
        res.json(response(reply));
    } catch (err) {
        throw err;
    }
});

router.delete('/:idReply', async (req, res) => {
    try {
        const p = await Post.findOneAndUpdate({
            _id: req.body.idPost,
            "comments._id": req.body.idComment
        },
            { "$pull": { "comments.$.replies": { _id: req.params.idReply } } },
            { new: true }
        );
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