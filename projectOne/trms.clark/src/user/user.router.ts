import express from 'express';
import * as user from './user';
import logger from '../log';
import publicDir from '../constant';
import userService from './userDBService';
import { User } from './user';

const router = express.Router();

/* GET users listing. */
router.get('/login', function (req: any, res, next) {
  if (req.session.user) {
    logger.info(req.session.user);
    res.redirect('/');
  }
  res.sendFile('login.html', { root: publicDir });
});

router.get('/', (req: any, res, next) => {
  let u = { ...req.session.user };
  logger.debug(`userRouter get: ${u}`);
  res.send(JSON.stringify(u));
});

router.get('/', (req: any, res, next) => {
  let u = { ...req.session.user };
  logger.debug(`userRouter get: ${u}`);
  res.send(JSON.stringify(u));
});

router.get('/:id', (req: any, res, next) => {
  userService
    .getUserByName(req.params.id)
    .then((user: User | null) => {
      res.send(JSON.stringify(user));
    })
    .catch((err) => {
      logger.error('eventRouter error: ' + err);
    });
});

router.delete('/', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.sendStatus(204);
});

router.post('/', function (req: any, res, next) {
  logger.debug(`userRouter post: ${req.body}`);
  user
    .login(req.body.name, req.body.password)
    .then((user) => {
      if (user === null) {
        res.sendStatus(401);
      }
      req.session.user = user;
      res.send(JSON.stringify(user));
    })
    .catch((err) => {
      logger.error('userRouter login err: ' + err);
    });

  router.put('/', (req, res, next) => {
    logger.debug(`userRouter post: ${req.body}`);
    userService
      .updateUser(req.body)
      .then((data) => {
        logger.debug('Router-updateUser: ' + data);
        res.send(data);
      })
      .catch((err) => {
        logger.error('Router-updateUser: ' + err);
      });
  });
});

export default router;
