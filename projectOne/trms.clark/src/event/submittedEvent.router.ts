import Express from 'express';
import logger from '../log';
import submittedEventService from './submittedEvent.service';
import { SubmittedEvent } from './submittedEvent';

const router = Express.Router();

router.get('/', function (req: any, res, next) {
  submittedEventService
    .getEvents()
    .then((submittedEvents) => {
      res.send(JSON.stringify(submittedEvents));
      req.session.events = req.body.events;
      logger.trace('eventRouter success: ' + JSON.stringify(submittedEvents));
    })
    .catch((err) => {
      logger.error('eventRouter error: ' + err);
    });
});

router.get('/:id', function (req, res, next) {
  submittedEventService
    .getEvent(req.params.id)
    .then((claim: SubmittedEvent | null) => {
      res.send(JSON.stringify(claim));
    })
    .catch((err) => {
      logger.error('eventRouter error: ' + err);
    });
});

router.delete('/:id', function (req, res, next) {
  logger.debug(`subEvent Router delete: ${req.body}`);
  submittedEventService
    .deleteEvent(req.params.id)
    .then((data) => {
      logger.debug(`subEvent Router delete: ${data}`);
      res.sendStatus(200); // Created
    })
    .catch((err) => {
      logger.error(`subEvent Router delete:${err}`);
      res.sendStatus(500); // Server error, sorry
    });
});

router.post('/', (req, res, next) => {
  logger.debug(`subEvent Router post: ${req.body}`);
  submittedEventService
    .addEvent(req.body)
    .then((data) => {
      logger.debug(`subEvent Router post: ${data}`);
      res.sendStatus(201); // Created
    })
    .catch((err) => {
      logger.error(`subEvent Router post: ${err}`);
      res.sendStatus(500); // Server error, sorry
    });
});

export default router;
