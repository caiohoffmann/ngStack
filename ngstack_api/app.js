const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');



//NGS IMPORT
const jwstkey = require('./utils/key');

const { verifyToken } = require('./utils/verifyToken');
const response = require('./utils/response');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect(`mongodb+srv://${jwstkey.mongoUser}:${jwstkey.mongoPass}@cluster0-mxtly.mongodb.net/test?retryWrites=true&w=majority`);
mongoose.set('useCreateIndex', true);
app.use(cors());

app.use('/posts', require('./route/posts'));
app.use('/homes', require('./route/homes'));
app.use('/users', require('./route/user'));
app.use('/auth', require('./route/auth'));

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
