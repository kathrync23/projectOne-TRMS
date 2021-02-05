import logger from '../log';
import { User, userToString } from './user';
import dynamo from '../dynamo/dynamo';

class UserService {
  private URI: string;
  doc: any;
  constructor() {
    // URL of the express server
    this.URI = 'http://localhost:3000/users';
    this.doc = dynamo;
  }

  /**
   * gets the user by the given name.
   * @param username - name to search database by
   * returns a promise with the Employee object
   */
  async getUserByName(username: string): Promise<User | null> {
    const params = {
      TableName: 'EMPLOYEES',
      Key: {
        username: username,
      },
    };
    return await this.doc
      .get(params)
      .promise()
      .then((data: any) => {
        if (data && data.Item) {
          logger.debug(`data.Item: ${JSON.stringify(data.Item)}`);
          return data.Item as User;
        } else {
          return null;
        }
      })
      .catch((err: any) => {
        logger.error('GetUserByName err: ' + err);
        return null;
      });
  }
  /**
   * addUser adds a Employee to the databse
   * @param user - the Employee added to the database
   */
  async addUser(user: User): Promise<boolean> {
    // object to be sent to AWS.
    const params = {
      // TableName - the name of the table we are sending it to
      TableName: 'EMPLOYEES',
      // Item - the object we are sending
      Item: user,
      ConditionExpression: '#username <> :username',
      ExpressionAttributeNames: {
        '#username': 'username',
      },
      ExpressionAttributeValues: {
        ':username': user.username,
      },
    };
    logger.debug(`addUser: ${userToString(user)}`);
    return await this.doc
      .put(params)
      .promise()
      .then(() => {
        logger.info('Successfully created Employee');
        return true;
      })
      .catch((error: any) => {
        logger.error(`addUser: ${error}`);
        return false;
      });
  }

  /**
   * updateUser updates the user
   * @param user
   */
  async updateUser(user: User) {
    const params = {
      TableName: 'EMPLOYEES',
      Key: {
        username: user.username,
      },
      UpdateExpression:
        'set #availableAmount=:availableAmount, #claimReqsToApprove=:claimReqsToApprove, #claimReqs=:claimReqs',
      ExpressionAttributeValues: {
        ':availableAmount': user.availableAmount,
        ':claimReqsToApprove': user.claimReqsToApprove,
        ':claimReqs': user.claimReqs,
      },
      ExpressionAttributeNames: {
        '#availableAmount': 'availableAmount',
        '#claimReqsToApprove': 'claimReqsToApprove',
        '#claimReqs': 'claimReqs',
      },
      ReturnValues: 'UPDATED_NEW',
    };
    return await this.doc
      .update(params)
      .promise()
      .then((data: any) => {
        logger.debug(`Data: ${JSON.stringify(data)}`);
        return true;
      })
      .catch((error: any) => {
        logger.error(`updateUser: ${error}`);
        return false;
      });
  }
}

const userService = new UserService();
export default userService;
