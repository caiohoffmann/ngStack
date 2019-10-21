const express = require('express');

const replyRouter = require('./reply');
const Post = require('../data/post');
const response = require('../utils/response');

const router = express.Router();

router.use('/:idComment/replies', getComment, replyRouter);

function getComment(req, res, next) {
    req.body.idComment = req.params.idComment;
    next();
}

router.get('/', async (req, res) => {
    let query = { _id: `${req.body.idPost}` };
    const comment = await Post.find(query).exec();
    res.json(comment);
});


router.post('/', async (req, res) => {

    let query = { _id: `${req.body.idPost}` };

    const findPost = await Post.updateOne(query, {
        $push: {
            comments: {
                "content": req.body.content,
                "owner": req.body.owner,
                "like": 0
            }
        }
    }).exec();
    res.json(response({ msg: "Comment added succesfully" }));
});


router.get('/:id_comment', async (req, res) => {
    let query = { _id: `${req.params.id_comment}` }
    const findComment = await Comment.findOne(query).exec();
    res.json(response(findComment));
});


router.delete('/:id_comment', async (req, res) => {
    let query = { _id: `${req.body.idPost}`, "comments._id": req.params.id_comment };

    const dltcmt = await Post.updateOne(query, {
        $pull: {
            comments: {
                _id: req.params.id_comment
            }
        }
    }).exec();
    res.json(response(dltcmt));
});


//,{ upsert: true }
router.patch('/:id_comment/like', async (req, res) => {
    let query = { _id: `${req.body.idPost}`, "comments._id": req.params.id_comment };
    let update_comment = {
        $inc: { "comments.$.like": 1 }
    };
    const put_cmt = await Post.updateOne(query, update_comment).exec();
    res.json(response(put_cmt));
});




router.put('/:id_comment', async (req, res) => {
    let query = { _id: `${req.body.idPost}`, "comments._id": req.params.id_comment };
    let update_comment = {
        $set: {
            "comments.$.content": req.body.content,
            "comments.$.owner": req.body.owner
        }
    };
    const put_cmt = await Post.updateOne(query, update_comment).exec();
    res.json(response(put_cmt));
});



module.exports = router;