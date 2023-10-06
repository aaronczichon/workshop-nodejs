const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const manufacturersRouter = require('./routes/manufacturers');
const carsRouter = require('./routes/cars');
const { loggingMiddleware } = require('./helpers/logging-middleware');
const app = express();
const swagger = require('express-swagger-generator')(app);

const passport = require('passport');
const { passportStrategyInit } = require('./authentication/basic-strategy');

let options = {
  swaggerDefinition: {
      info: {
          description: 'This is our CarAPI documentation',
          title: 'CarAPI',
          version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/',
      produces: [
          "application/json"
      ],
      schemes: ['http']
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
};
swagger(options)

passportStrategyInit();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(loggingMiddleware);

app.use('/', indexRouter);
app.use('/manufacturer',passport.authenticate('basic', {session: false}), manufacturersRouter);
app.use('/car', carsRouter);

 
module.exports = app;
