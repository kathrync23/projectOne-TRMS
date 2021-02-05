"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = __importStar(require("aws-sdk"));
var submittedEvent_service_1 = __importDefault(require("../event/submittedEvent.service"));
var claim_1 = require("../claims/claim");
var claimDBService_1 = __importDefault(require("../claims/claimDBService"));
var user_1 = require("../user/user");
var userDBService_1 = __importDefault(require("../user/userDBService"));
var log_1 = __importDefault(require("../log"));
AWS.config.update({ region: 'us-east-2' });
// Create a DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var removeEmployees = {
    TableName: 'EMPLOYEES',
};
var removeClaims = {
    TableName: 'CLAIMS',
};
var removeEvents = {
    TableName: 'EVENTS',
};
var userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'username',
            AttributeType: 'S',
        },
    ],
    KeySchema: [
        {
            AttributeName: 'username',
            KeyType: 'HASH',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
    },
    TableName: 'EMPLOYEES',
    StreamSpecification: {
        StreamEnabled: false,
    },
};
var claimRequestsSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'eventName',
            AttributeType: 'S',
        },
        {
            AttributeName: 'employee',
            AttributeType: 'S',
        },
        {
            AttributeName: 'approver',
            AttributeType: 'S',
        },
    ],
    KeySchema: [
        {
            AttributeName: 'employee',
            KeyType: 'HASH',
        },
        {
            AttributeName: 'eventName',
            KeyType: 'RANGE',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
    },
    TableName: 'CLAIMS',
    StreamSpecification: {
        StreamEnabled: false,
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'SupervisorIndex',
            KeySchema: [
                {
                    AttributeName: 'approver',
                    KeyType: 'HASH',
                },
            ],
            Projection: {
                ProjectionType: 'ALL',
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 3,
                WriteCapacityUnits: 3,
            },
        },
    ],
};
var eventToReimburseSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'eventName',
            AttributeType: 'S',
        },
    ],
    KeySchema: [
        {
            AttributeName: 'eventName',
            KeyType: 'HASH',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
    },
    TableName: 'EVENTS',
    StreamSpecification: {
        StreamEnabled: false,
    },
};
ddb.deleteTable(removeEmployees, function (err, data) {
    if (err) {
        log_1.default.error("can't delete employees table");
    }
    else {
        log_1.default.info('deleted employees table');
    }
    setTimeout(function () {
        ddb.createTable(userSchema, function (err, data) {
            if (err) {
                // log the error
                log_1.default.error("can't create employees table");
            }
            else {
                // celebrate, I guess
                log_1.default.info('created employees table');
                setTimeout(function () {
                    populateEmployeeTable();
                }, 5000);
            }
        });
    }, 5000);
});
ddb.deleteTable(removeClaims, function (err, data) {
    if (err) {
        log_1.default.error("can't delete claims table");
    }
    else {
        log_1.default.info('deleted claims table');
    }
    setTimeout(function () {
        ddb.createTable(claimRequestsSchema, function (err, data) {
            if (err) {
                log_1.default.error("can't create claims table" + err);
            }
            else {
                log_1.default.info('created claims table');
                setTimeout(function () {
                    populateClaimTable();
                }, 20000);
            }
        });
    }, 20000);
});
ddb.deleteTable(removeEvents, function (err, data) {
    if (err) {
        log_1.default.error("can't delete events table");
    }
    else {
        log_1.default.info('deleted events table');
    }
    setTimeout(function () {
        ddb.createTable(eventToReimburseSchema, function (err, data) {
            if (err) {
                log_1.default.error("can't create events table");
            }
            else {
                log_1.default.info('created events table');
                setTimeout(function () {
                    populateEventTable();
                }, 16000);
            }
        });
    }, 16000);
});
/**
 * EMPLOYEES
 */
function populateEmployeeTable() {
    userDBService_1.default.addUser({
        username: 'AliceSmith',
        password: 'asdf',
        claimReqs: [new claim_1.ClaimKey('Course1', 'AliceSmith')],
        role: 'Employee',
        claimReqsToApprove: null,
        supervisorName: 'BrandonJohnson',
        availableAmount: 500,
    });
    userDBService_1.default.addUser({
        username: 'BrandonJohnson',
        password: 'asdf',
        claimReqs: [new claim_1.ClaimKey('Course1', 'BrandonJohnson')],
        role: 'Direct Supervisor',
        claimReqsToApprove: [{ employee: 'AliceSmith', eventName: 'Course1' }],
        supervisorName: 'CarrieAnderson',
        availableAmount: 500,
    });
    userDBService_1.default.addUser(new user_1.User('CarrieAnderson', 'asdf', [], 'Department Head', 'KathrynClark', [
        { employee: 'BrandonJohnson', eventName: 'Course1' },
    ]));
    userDBService_1.default.addUser({
        username: 'KathrynClark',
        password: 'asdf',
        claimReqs: [],
        role: 'BenCo',
        claimReqsToApprove: [],
        supervisorName: 'DarinAbilene',
        availableAmount: 1000,
    });
    userDBService_1.default.addUser({
        username: 'DarinAbilene',
        password: 'asdf',
        claimReqs: [],
        role: 'BenCo',
        claimReqsToApprove: [],
        supervisorName: 'KathrynClark',
        availableAmount: 1000,
    });
}
/**
 * CLAIMS
 */
function populateClaimTable() {
    claimDBService_1.default.addClaim(new claim_1.Claim('Course1', 'AliceSmith', 500, 'BrandonJohnson', 'It will teach me how to do something.', 'n/a'));
    claimDBService_1.default.addClaim(new claim_1.Claim('Course1', 'BrandonJohnson', 500, 'CarrieAnderson', 'I want to go because I want to.', 'n/a'));
}
/**
 * EVENTS
 */
function populateEventTable() {
    submittedEvent_service_1.default.addEvent({
        eventName: 'Course1',
        eventType: 'University Course',
        startDate: 123456,
        gradingType: 'Letter',
        totalCost: 625,
        location: 'New York City, New York',
    });
    submittedEvent_service_1.default.addEvent({
        eventName: 'ReactSeminar',
        eventType: 'Seminar',
        startDate: 123456,
        gradingType: 'Presentation',
        totalCost: 1500,
        location: 'Seattle, Washington',
    });
}
