import claimService from './claimDBService';

/**
 * Claim class.
 * Fields: eventName, employee, claimAmount, approver, justification, approverLetter
 */
export class Claim {
  constructor(
    public eventName: string,
    public employee: string,
    public claimAmount: number,
    public approver: string,
    public justification: string,
    public approverLetter: string
  ) {}
}

export function claimToString(claim: Claim): string {
  return ` ${claim.eventName} - ${claim.employee}
  \t${claim.claimAmount}`;
}

export class ClaimKey {
  constructor(public eventName: string, public employee: string) {}
}
