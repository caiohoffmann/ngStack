const express = require('express');

const Post = require('../data/post');
const response = require('../utils/response');

const router = express.Router();

router.post('/', verifyReply, async (req, res) => {
    try {
        const p = await Post.updateOne({ _id: req.body.idPost, "comments._id": req.body.idComment },
            {
                $push: {
                    "comments.$.replies": {
                        content: req.body.content,
                        owner: req.body.owner
                    }
                }
            }).exec();
        res.json(response(p));
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
    res.json(response(reply));
});

router.get('/', async (req, res) => {
    const reply = await Post.findOne({
        _id: req.body.idPost,
        'comments._id': req.body.idComment
    }).exec();
    res.json(response(reply));
});

router.patch('/:idReply', async (req, res) => {
    try {
        const p = await Post.updateOne({
            _id: req.body.idPost,
            'comments.replies._id': req.params.idReply
        },
            { "$set": { "comments.$[comment].replies.$[reply].content": req.body.content } },
            {
                "arrayFilters": [
                    { "comment._id": req.body.idComment },
                    { "reply._id": req.params.idReply }
                ]
            });
        res.json(response(p));
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
                returnNewDocument: true
            });
        res.json(response(p));
    } catch (err) {
        throw err;
    }
});

router.delete('/:idReply', async (req, res) => {
    try {
        const p = await Post.updateOne({
            _id: req.body.idPost,
            "comments._id": req.body.idComment
        },
            { "$pull": { "comments.$.replies": { _id: req.params.idReply } } }
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