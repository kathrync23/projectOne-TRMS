export class SubmittedEvent {
  public eventName: string = '';
  public startDate: number = Date.now();
  public gradingType?: string = '';
  public eventType: string = '';
  public totalCost: number = 0;
  public location: string = '';
}

export function eventToString(event: SubmittedEvent): string {
  return `${event.eventName}:
    \t${event.startDate}
    \t${event.eventType}
    \t${event.gradingType}`;
}
