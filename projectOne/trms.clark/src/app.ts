import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import session from 'express-session';
import MemoryStore from 'memorystore';
import cors from 'cors';

import publicDir from './constant';

import dotenv from 'dotenv';
import usersRouter from './user/user.router';
import indexRouter from './staticrouter/index';
import claimService from './claims/claimDBService';
import claimRouter from './claims/claimRouter';
import submittedEventRouter from './event/submittedEvent.router';

dotenv.config();
var app = express();

// view engine setup
app.use(
  cors({
    origin: [process.env.CLIENT as string],
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('/'));
app.use(
  session({
    secret: 'whatever',
    store: new (MemoryStore(session))({ checkPeriod: 86400000 }),
    cookie: {},
  })
);

/**
 * Sets routers
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/claims', claimRouter);
app.use('/submittedEvents', submittedEventRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: Function) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
