/**
 * Fields: eventName, employee, claimAmount, approver, justification, approverLetter
 */
export class Claim {
  public eventName: string = 'name';
  public employee: string = 'emp';
  public claimAmount: number = 0;
  public approver: string = 'approver';
  public justification: string = 'just';
  public approverLetter: string = 'N/A';
}

/**
 * creates a string of the claim.
 * @param claim  - given claim
 */
export function claimToString(claim: Claim): string {
  return `${claim.eventName}:
  \tClaim Amount: $${claim.claimAmount}
  \tapprover: ${claim.approver}
  \tjustification: ${claim.justification}
  \tapproverLetter: ${claim.approverLetter}`;
}

/**
 * Class for ClaimKey to put the key of the claim into one object
 * Fields: eventName, employee
 */
export class ClaimKey {
  public eventName: string = '';
  public employee: string = '';
  constructor(employee: string, eventName: string) {
    this.eventName = eventName;
    this.employee = employee;
  }
}
