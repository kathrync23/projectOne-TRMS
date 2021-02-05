import { ClaimKey } from '../claims/claim';

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
  public username: string = '';
  public password: string = 'NO PASSWORD USER';
  public claimReqs: ClaimKey[] = [];
  public role: string = 'Employee';
  public supervisorName: string = '';
  public claimReqsToApprove?: string[];
  public availableAmount: number = 1000;
}

export function userToString(user: User): string {
  return `${user.username} - ${user.password}
  \t${user.supervisorName} - ${user.role}
  \t${JSON.stringify(user.claimReqs)}`;
}
