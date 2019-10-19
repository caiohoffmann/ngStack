const express = require('express');

const commentsRouter = require('./comments');

const router = express.Router();

router.use('/comments', commentsRouter);

module.exports = router;