var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const uuidv1 = require('uuid/v1');
var cors = require('cors');
const result = require('dotenv').config();
//module for getting enviroment variables. aws will take these automatically
if (result.error) {
  throw result.error;
}

// connect to mongo with mongoose
mongoose.connect(process.env.MONGO_PASS);
const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var awsRouter = require('./routes/aws');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aws', awsRouter);

module.exports = app;
