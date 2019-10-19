const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');



//NGS IMPORT
const jwstkey = require('./key');
const User = require('./data/user');
const Post = require('./data/post');
const Comment = require('./data/comments');



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

      //console.log(`Data ${data}`);
      res.header('ngstackauth', data);
      res.json({ msg: 'success' });

    }
  );

});
app.get('/auth', (req, res, next) => {
  if (!req.headers.ngstackauth) {
    return next('Invalid');

  }
  jwt.verify(req.headers.ngstackauth, jwstkey.jwt, (err, data) => {
    if (err) throw err;

    res.json(data);

  })

})

app.get('/users', async (req, res) => {
  const list = await User.find({}).exec();
  res.json(list);
});

app.post('/users', async (req, res) => {
  const u = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  });
  const user = await u.save();
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  let userId = req.params.id;
  const usser = await User.deleteOne({ _id: userId });
  res.json({ msg: 'successfuly deleted' })
})

///posts
app.get('/posts', async (req, res) => {
  const p = await Post.find({}).exec();
  res.json(p);
})

app.post('/posts', async (req, res) => {
  const p = new Post({
    title: req.body.title,
    tags: req.body.tags,
    owner: req.body.owner,
    date: req.body.date
  })
  const post = await p.save();
  res.json(post);
})

app.get('/comment', async (req, res) => {
  const comment = await Comment.find({}).exec();
  res.json(comment);
})



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.json(500, err);
});

module.exports = app;
