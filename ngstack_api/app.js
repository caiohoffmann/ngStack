const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');



//NGS IMPORT
const jwstkey = require('./utils/key');
const User = require('./data/user');
const Post = require('./data/post');
const Comment = require('./data/comments');
const { verifyToken } = require('./utils/verifyToken');
const response = require('./utils/response');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect(`mongodb+srv://${jwstkey.mongoUser}:${jwstkey.mongoPass}@cluster0-mxtly.mongodb.net/test?retryWrites=true&w=majority`);
mongoose.set('useCreateIndex', true);

app.get('/test', (req, res) => {

  jwt.sign({
    "email": "js@gmail.com"
  },
    jwstkey.jwt, (err, data) => {
      if (err) throw err;

      res.header('ngstackauth', data);
      res.json({ msg: 'success' });

    }
  );
});

app.use('/posts', require('./route/posts'));
app.use('/users', require('./route/user'));

app.use((req, res, next) => {
  res.json(404, response(null, "Route not found"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.json(500, response(null, err));
});

module.exports = app;
