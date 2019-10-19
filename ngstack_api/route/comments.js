const express = require('express');

const replyRouter = require('./reply');

const router = express.Router();

router.use('/:idComment/reply', getComment, replyRouter);

//Find the comment in the database and pass the comment object in the request body for the reply router
function getComment(req, res, next) {
    next();
}

router.get('/comment', async (req, res) => {
    const comment = await Comment.find({}).exec();
    res.json(comment);
})


module.exports = router;