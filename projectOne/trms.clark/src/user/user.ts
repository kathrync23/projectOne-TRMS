import { ClaimKey } from '../claims/claim';
import logger from '../log';
import userService from './userDBService';

/**
 * User class
 * new User(username: string, password: string, claimReqs: string[], supervisorName: string, claimReqToApprove: string[])
 * username - name to log in with (string)
 * password - password to log in with (string)
 * claimReqs - ids of claim requests that have been made (string[])
 * role - role of employee (string) either 'Employee', 'Direct Supervisor', 'Department Head', 'Benefits Coordinator'
 * supervisor - username of their supervisor (for Employee, dept head for supervisor, benco for dept head, different benco for benco)
 * claimReqsToApprove - ids of claim requests that need to be approved by this person.
 */
export class User {
  public claimReqsToApprove: ClaimKey[] | null = null;
  public availableAmount: number = 1000;
  constructor(
    public username: string,
    public password: string,
    public claimReqs: ClaimKey[] = [],
    public role: string = 'Employee',
    public supervisorName: string,
    ...params: any[]
  ) {
    if (role) {
      this.role = role;
    }
    if (role != 'Employee') {
      this.claimReqsToApprove = [];
    }
    this.claimReqsToApprove = params[0];
  }
}

/**
 * login attempts a log in for the user using the given
 * username and password.
 * @param username - string
 * @param password - string
 */
export async function login(username: string, password: string) {
  logger.info('Attempted a login.');
  logger.debug(`login attempt ${username + ' ' + password}`);
  return await userService
    .getUserByName(username)
    .then((user) => {
      if (user && user.password === password) {
        return user;
      } else {
        return null;
      }
    })
    .catch((err) => {
      logger.error('Error logging in: ' + err);
      return null;
    });
}

export function userToString(user: User) {
  return `${user.username}: ${user.password}
  Role: ${user.role} - ${JSON.stringify(user.claimReqs)}
  Supervisor: ${user.supervisorName}
  ReqsToApprove: ${user.claimReqsToApprove}`;
}
