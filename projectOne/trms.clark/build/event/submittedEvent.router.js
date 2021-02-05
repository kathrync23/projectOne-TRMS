"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_1 = __importDefault(require("../log"));
var submittedEvent_service_1 = __importDefault(require("./submittedEvent.service"));
var router = express_1.default.Router();
router.get('/', function (req, res, next) {
    submittedEvent_service_1.default
        .getEvents()
        .then(function (submittedEvents) {
        res.send(JSON.stringify(submittedEvents));
        req.session.events = req.body.events;
        log_1.default.trace('eventRouter success: ' + JSON.stringify(submittedEvents));
    })
        .catch(function (err) {
        log_1.default.error('eventRouter error: ' + err);
    });
});
router.get('/:id', function (req, res, next) {
    submittedEvent_service_1.default
        .getEvent(req.params.id)
        .then(function (claim) {
        res.send(JSON.stringify(claim));
    })
        .catch(function (err) {
        log_1.default.error('eventRouter error: ' + err);
    });
});
router.delete('/:id', function (req, res, next) {
    log_1.default.debug("subEvent Router delete: " + req.body);
    submittedEvent_service_1.default
        .deleteEvent(req.params.id)
        .then(function (data) {
        log_1.default.debug("subEvent Router delete: " + data);
        res.sendStatus(200); // Created
    })
        .catch(function (err) {
        log_1.default.error("subEvent Router delete:" + err);
        res.sendStatus(500); // Server error, sorry
    });
});
router.post('/', function (req, res, next) {
    log_1.default.debug("subEvent Router post: " + req.body);
    submittedEvent_service_1.default
        .addEvent(req.body)
        .then(function (data) {
        log_1.default.debug("subEvent Router post: " + data);
        res.sendStatus(201); // Created
    })
        .catch(function (err) {
        log_1.default.error("subEvent Router post: " + err);
        res.sendStatus(500); // Server error, sorry
    });
});
exports.default = router;
