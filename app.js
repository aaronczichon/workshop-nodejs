const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const manufacturersRouter = require('./routes/manufacturers');
const carsRouter = require('./routes/cars');
const { loggingMiddleware } = require('./helpers/logging-middleware');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(loggingMiddleware);

app.use('/', indexRouter);
app.use('/manufacturer', manufacturersRouter);
app.use('/car', carsRouter);
 
module.exports = app;
