import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { eventNames } from 'process';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Claim, claimToString } from './claim';

class ClaimService {
  private doc: DocumentClient;
  constructor() {
    this.doc = dynamo;
  }

  async getClaims(): Promise<Claim[]> {
    const params = {
      TableName: 'CLAIMS',
    };
    return await this.doc
      .scan(params)
      .promise()
      .then((data) => {
        return data.Items as Claim[];
      })
      .catch((err) => {
        logger.error(`getClaims error: ${err}`);
        return [];
      });
  }

  async getClaim(employee: string, eventName: string): Promise<Claim | null> {
    const params = {
      TableName: 'CLAIMS',
      Key: {
        employee: employee,
        eventName: eventName,
      },
    };
    return await this.doc
      .get(params)
      .promise()
      .then((data) => {
        logger.trace('Got claim');
        return data.Item as Claim;
      })
      .catch((err) => {
        logger.error('getClaimed fail: ' + err);
        return null;
      });
  }

  async getClaimsByApprover(approver: string): Promise<Claim[] | []> {
    const params = {
      TableName: 'CLAIMS',
      IndexName: 'SupervisorIndex',
      KeyConditionExpressions: 'approver = :approver',
      ExpressionAttributeValues: {
        approver: approver,
      },
      ScanIndexForward: false,
    };
    return await this.doc
      .query(params)
      .promise()
      .then((data) => {
        if (data && data.Items && data.Items.length) {
          logger.debug(`ClaimsByApprover Data: ${JSON.stringify(data)}`);
          return data.Items as Claim[];
        } else {
          return [];
        }
      })
      .catch((err) => {
        logger.error('getClaimsByApprover: ' + err);
        return [];
      });
  }

  async addClaim(claim: Claim): Promise<boolean> {
    // object to be sent to AWS.
    const params = {
      TableName: 'CLAIMS',
      Item: claim,
    };

    return await this.doc
      .put(params)
      .promise()
      .then((result) => {
        logger.info('Successfully added claim');
        return true;
      })
      .catch((error) => {
        logger.error(`addClaim err: ${error}`);
        return false;
      });
  }

  async deleteClaim(employee: string, eventName: string) {
    const params = {
      TableName: 'CLAIMS',
      Key: {
        employee: employee,
        eventName: eventName,
      },
    };
    return await this.doc
      .delete(params)
      .promise()
      .then((data) => {
        logger.debug(`employee: ${employee} / eventName: ${eventName}`);
        logger.info('deleteClaim: ' + data);
        return true;
      })
      .catch((err) => {
        logger.error('deleteClaim: ' + err);
        return false;
      });
  }

  async updateClaim(claim: Claim) {
    const params = {
      TableName: 'CLAIMS',
      Key: {
        employee: claim.employee,
        eventName: claim.eventName,
      },
      UpdateExpression:
        'set #justification=:justification, #approver=:approver,#claimAmount=:claimAmount',
      ExpressionAttributeValues: {
        ':justification': claim.justification,
        ':approver': claim.approver,
        ':claimAmount': claim.claimAmount,
      },
      ExpressionAttributeNames: {
        '#justification': 'justification',
        '#approver': 'approver',
        '#claimAmount': 'claimAmount',
      },
      ReturnValue: 'UPDATED_NEW',
    };

    return await this.doc
      .update(params)
      .promise()
      .then(() => {
        logger.info('Successfully updated the claim');
        return true;
      })
      .catch((err) => {
        logger.error('Update claim err: ' + err);
        return false;
      });
  }
}

const claimService = new ClaimService();

export default claimService;
