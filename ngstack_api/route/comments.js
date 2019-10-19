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
    res.json(response(comment));
});


router.post('/', async (req, res) => {

    let query = { _id: `${req.body.idPost}` };

    const findPost = await Post.updateOne(query, {
        $push: {
            comments: {
                "content": req.body.content,
                "like": req.body.like,
                "owner": req.body.owner
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
    let query = { _id: `${req.params.id_comment}` }
    const dltcmt = await Comment.deleteOne(query).exec();
    res.json(response(dltcmt));
});


router.put('/:id_comment', async (req, res) => {
    let query = { _id: `${req.params.id_comment}` }
    let update_comment = { content: req.body.like };

    // Comment.patchUpdate(query, update_comment).then((updatedUser) => {
    //     res.json(response(updatedUser));
    //     //res.status(200).json(updatedUser);
    // })
    //     .catch((err) => {
    //         next(err);
    //     });

    const put_cmt = await Comment.updateOne(query, update_comment);
    res.json(response(put_cmt));
});

router.patch('/:id_comment', async (req, res) => {
    //let query = { _id: `${req.params.id_comment}` };
    let query = { _id: ObjectId(req.params.userId) };

    const array = await Comment.findOne({})

    var update_comment = {
        like: req.body.like
    };

    // const put_cmt = await Comment.updateOne(query, update_comment);
    res.json(response(put_cmt));
});

//Path for after

module.exports = router;