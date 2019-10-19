const express = require('express');

const replyRouter = require('./reply');

const router = express.Router();

router.use('/reply', replyRouter);

module.exports = router;