import * as AWS from 'aws-sdk';
import { EventEmitter } from 'events';
import { SubmittedEvent } from '../event/submittedEvent';
import eventService from '../event/submittedEvent.service';
import { Claim, ClaimKey } from '../claims/claim';
import claimService from '../claims/claimDBService';
import { User } from '../user/user';
import userService from '../user/userDBService';
import logger from '../log';

AWS.config.update({ region: 'us-east-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeEmployees = {
  TableName: 'EMPLOYEES',
};

const removeClaims = {
  TableName: 'CLAIMS',
};

const removeEvents = {
  TableName: 'EVENTS',
};

const userSchema = {
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

const claimRequestsSchema = {
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

const eventToReimburseSchema = {
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
    logger.error("can't delete employees table");
  } else {
    logger.info('deleted employees table');
  }
  setTimeout(() => {
    ddb.createTable(userSchema, (err, data) => {
      if (err) {
        // log the error
        logger.error("can't create employees table");
      } else {
        // celebrate, I guess
        logger.info('created employees table');
        setTimeout(() => {
          populateEmployeeTable();
        }, 5000);
      }
    });
  }, 5000);
});

ddb.deleteTable(removeClaims, function (err, data) {
  if (err) {
    logger.error("can't delete claims table");
  } else {
    logger.info('deleted claims table');
  }
  setTimeout(() => {
    ddb.createTable(claimRequestsSchema, (err, data) => {
      if (err) {
        logger.error("can't create claims table" + err);
      } else {
        logger.info('created claims table');
        setTimeout(() => {
          populateClaimTable();
        }, 20000);
      }
    });
  }, 20000);
});

ddb.deleteTable(removeEvents, function (err, data) {
  if (err) {
    logger.error("can't delete events table");
  } else {
    logger.info('deleted events table');
  }
  setTimeout(() => {
    ddb.createTable(eventToReimburseSchema, (err, data) => {
      if (err) {
        logger.error("can't create events table");
      } else {
        logger.info('created events table');
        setTimeout(() => {
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
  userService.addUser({
    username: 'AliceSmith',
    password: 'asdf',
    claimReqs: [new ClaimKey('Course1', 'AliceSmith')],
    role: 'Employee',
    claimReqsToApprove: null,
    supervisorName: 'BrandonJohnson',
    availableAmount: 500,
  });
  userService.addUser({
    username: 'BrandonJohnson',
    password: 'asdf',
    claimReqs: [new ClaimKey('Course1', 'BrandonJohnson')],
    role: 'Direct Supervisor',
    claimReqsToApprove: [{ employee: 'AliceSmith', eventName: 'Course1' }],
    supervisorName: 'CarrieAnderson',
    availableAmount: 500,
  });
  userService.addUser(
    new User('CarrieAnderson', 'asdf', [], 'Department Head', 'KathrynClark', [
      { employee: 'BrandonJohnson', eventName: 'Course1' },
    ])
  );
  userService.addUser({
    username: 'KathrynClark',
    password: 'asdf',
    claimReqs: [],
    role: 'BenCo',
    claimReqsToApprove: [],
    supervisorName: 'DarinAbilene',
    availableAmount: 1000,
  });
  userService.addUser({
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
  claimService.addClaim(
    new Claim(
      'Course1',
      'AliceSmith',
      500,
      'BrandonJohnson',
      'It will teach me how to do something.',
      'n/a'
    )
  );
  claimService.addClaim(
    new Claim(
      'Course1',
      'BrandonJohnson',
      500,
      'CarrieAnderson',
      'I want to go because I want to.',
      'n/a'
    )
  );
}

/**
 * EVENTS
 */
function populateEventTable() {
  eventService.addEvent({
    eventName: 'Course1',
    eventType: 'University Course',
    startDate: 123456,
    gradingType: 'Letter',
    totalCost: 625,
    location: 'New York City, New York',
  });
  eventService.addEvent({
    eventName: 'ReactSeminar',
    eventType: 'Seminar',
    startDate: 123456,
    gradingType: 'Presentation',
    totalCost: 1500,
    location: 'Seattle, Washington',
  });
}
