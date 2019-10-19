// const express = require('express');

// const replyRouter = require('./reply');
// const Comment = require('../data/comments');
// const response = require('../utils/response');

// const router = express.Router();

// router.use('/:idComment/reply', getComment, replyRouter);

// //Find the comment in the database and pass the comment object in the request body for the reply router
// function getComment(req, res, next) {
//     next();
// }

// router.get('/', async (req, res) => {
//     const comment = await Comment.find({}).exec();
//     res.json(response(comment));
// });


// router.post('/', async (req, res) => {
//     let cms = new Comment({
//         "content": req.body.content
//     });
//     // let cms = new Comment({
//     //     "content": req.body.content,
//     //     "like": req.body.like,
//     //     "replies": {
//     //         "content": req.body.replies.content,
//     //         "likes": req.body.replies.likes,
//     //         "owner": req.body.replies.owner
//     //     }
//     // });
//     const saveComment = await cms.save();
//     res.json(response(saveComment));
// });


// router.get('/:id_comment', async (req, res) => {
//     let query = { _id: `${req.params.id_comment}` }
//     const findComment = await Comment.findOne(query).exec();
//     res.json(response(findComment));
// });


// router.delete('/:id_comment', async (req, res) => {
//     let query = { _id: `${req.params.id_comment}` }
//     const dltcmt = await Comment.deleteOne(query).exec();
//     res.json(response(dltcmt));
// });


// router.put('/:id_comment', async (req, res) => {
//     let query = { _id: `${req.params.id_comment}` }
//     let update_comment = { content: req.body.like };

//     // Comment.patchUpdate(query, update_comment).then((updatedUser) => {
//     //     res.json(response(updatedUser));
//     //     //res.status(200).json(updatedUser);
//     // })
//     //     .catch((err) => {
//     //         next(err);
//     //     });

//     const put_cmt = await Comment.updateOne(query, update_comment);
//     res.json(response(put_cmt));
// });

// router.patch('/:id_comment', async (req, res) => {
//     //let query = { _id: `${req.params.id_comment}` };
//     let query = { _id: ObjectId(req.params.userId) };

//     const array = await Comment.findOne({})

//     var update_comment = {
//         like: req.body.like
//     };

//     // const put_cmt = await Comment.updateOne(query, update_comment);
//     res.json(response(put_cmt));
// });

// //Path for after

// module.exports = router;