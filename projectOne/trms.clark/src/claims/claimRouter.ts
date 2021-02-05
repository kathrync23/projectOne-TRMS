import Express from 'express';
import logger from '../log';
import claimService from './claimDBService';
import { Claim } from './claim';

const router = Express.Router();

/* GET users listing. */
router.get('/', function (req: any, res, next) {
  claimService
    .getClaims()
    .then((claim) => {
      logger.trace(JSON.stringify(claim));
      // req.session.user.claims = req.body.claims;
      res.send(JSON.stringify(claim));
    })
    .catch((err) => {
      logger.error('claimRouter get: ' + err);
    });
});

router.get('/:id', function (req, res, next) {
  let params = req.params.id;
  let key = params.split('-');
  claimService
    .getClaim(key[0], key[1])
    .then((claim: Claim | null) => {
      logger.debug('claim service claim: ' + JSON.stringify(claim));
      res.send(JSON.stringify(claim));
    })
    .catch((err) => {
      logger.error(`claimRouter get promise err: ${err}`);
    })
    .catch((err) => {
      logger.error(`getClaim err: ${err}`);
    });
});

router.delete('/:id', function (req, res, next) {
  let params = req.params.id;
  let keyArr = params.split('-');
  logger.debug(
    `claimRouter delete employee: ${JSON.stringify(
      keyArr[0]
    )} / eventName: ${JSON.stringify(keyArr[1])}`
  );
  claimService
    .deleteClaim(keyArr[0], keyArr[1])
    .then((data) => {
      logger.debug(`claimRouter delete data: ${JSON.stringify(data)}`);
      res.sendStatus(200); // Created
    })
    .catch((err) => {
      logger.error(`claimRouter delete error: ${err}`);
      res.sendStatus(500); // Server error, sorry
    });
});

router.post('/', (req, res, next) => {
  logger.debug(`claimRouter post: ${req.body}`);
  claimService
    .addClaim(req.body)
    .then((data) => {
      logger.debug(`ClaimRouter post: ${data}`);
      res.sendStatus(201); // Created
    })
    .catch((err) => {
      logger.error(`claimRouter post error: ${err}`);
      res.sendStatus(500); // Server error, sorry
    });
});

router.put('/', (req, res, next) => {
  logger.debug('Claim update:' + JSON.stringify(req.body));
  claimService.updateClaim(req.body).then((data) => {
    res.send(data);
  });
});
export default router;
