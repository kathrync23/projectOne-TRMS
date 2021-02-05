import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { SubmittedEvent, eventToString } from './submittedEvent';

class EventService {
  private doc: DocumentClient;
  constructor() {
    this.doc = dynamo;
  }

  async getEvents(): Promise<SubmittedEvent[]> {
    const params = {
      TableName: 'EVENT_REQUESTS',
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((data) => {
        return data.Items as SubmittedEvent[];
      })
      .catch((err) => {
        logger.error(`getEvents DB error: ${err}`);
        return [];
      });
  }

  async addEvent(event: SubmittedEvent): Promise<boolean> {
    const params = {
      TableName: 'EVENTS',
      Item: event,
      ConditionExpression: '#eventName <> :eventName',
      ExpressionAttributeNames: {
        '#eventName': 'eventName',
      },
      ExpressionAttributeValues: {
        ':eventName': event.eventName,
      },
    };
    logger.debug(`addEvent: ${eventToString(event)}`);
    return await this.doc
      .put(params)
      .promise()
      .then(() => {
        logger.info('Successfully created event');
        return true;
      })
      .catch((error: any) => {
        logger.error(`addEvent: ${error}`);
        return false;
      });
  }
  async getEvent(eventName: string): Promise<SubmittedEvent | null> {
    const params = {
      TableName: 'EVENTS',
      Key: {
        eventName: eventName,
      },
    };
    return await this.doc
      .get(params)
      .promise()
      .then((data) => {
        logger.trace('getEvent dbService: ' + data.Item);
        return data.Item as SubmittedEvent;
      })
      .catch((err) => {
        logger.error(`getEvent err:${err}`);
        return null;
      });
  }

  async deleteEvent(eventName: string) {
    const params = {
      TableName: 'EVENTS',
      Key: {
        eventName: eventName,
      },
    };
    return await this.doc
      .delete(params)
      .promise()
      .then((data) => {
        return true;
      })
      .catch((err) => {
        logger.error(`deleteEvent err:${err}`);
        return false;
      });
  }
}

const eventService = new EventService();
export default eventService;
