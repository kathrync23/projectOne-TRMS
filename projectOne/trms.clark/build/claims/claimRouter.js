"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var claimDBService_1 = __importDefault(require("./claimDBService"));
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    claimDBService_1.default
        .getClaims()
        .then(function (claim) {
        log_1.default.trace(JSON.stringify(claim));
        // req.session.user.claims = req.body.claims;
        res.send(JSON.stringify(claim));
    })
        .catch(function (err) {
        log_1.default.error('claimRouter get: ' + err);
    });
});
router.get('/:id', function (req, res, next) {
    var params = req.params.id;
    var key = params.split('-');
    claimDBService_1.default
        .getClaim(key[0], key[1])
        .then(function (claim) {
        log_1.default.debug('claim service claim: ' + JSON.stringify(claim));
        res.send(JSON.stringify(claim));
    })
        .catch(function (err) {
        log_1.default.error("claimRouter get promise err: " + err);
    })
        .catch(function (err) {
        log_1.default.error("getClaim err: " + err);
    });
});
router.delete('/:id', function (req, res, next) {
    var params = req.params.id;
    var keyArr = params.split('-');
    log_1.default.debug("claimRouter delete employee: " + JSON.stringify(keyArr[0]) + " / eventName: " + JSON.stringify(keyArr[1]));
    claimDBService_1.default
        .deleteClaim(keyArr[0], keyArr[1])
        .then(function (data) {
        log_1.default.debug("claimRouter delete data: " + JSON.stringify(data));
        res.sendStatus(200); // Created
    })
        .catch(function (err) {
        log_1.default.error("claimRouter delete error: " + err);
        res.sendStatus(500); // Server error, sorry
    });
});
router.post('/', function (req, res, next) {
    log_1.default.debug("claimRouter post: " + req.body);
    claimDBService_1.default
        .addClaim(req.body)
        .then(function (data) {
        log_1.default.debug("ClaimRouter post: " + data);
        res.sendStatus(201); // Created
    })
        .catch(function (err) {
        log_1.default.error("claimRouter post error: " + err);
        res.sendStatus(500); // Server error, sorry
    });
});
router.put('/', function (req, res, next) {
    log_1.default.debug('Claim update:' + JSON.stringify(req.body));
    claimDBService_1.default.updateClaim(req.body).then(function (data) {
        res.send(data);
    });
});
exports.default = router;
