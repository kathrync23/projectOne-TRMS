export class SubmittedEvent {
  eventName: string = 'name';
  employee: string = 'emp';
  startDate: string = makeDate();
  gradingType: string = 'Gtype';
  eventType: string = 'eType';
  totalCost: number = 0;
  location: string = 'here';
}

export const gradingFormatChoices = [
  {
    label: 'Letter Grade',
    value: 'gradingFormat',
  },
  {
    label: 'Presentation',
    value: 'gradingFormat',
  },
];

export const eventTypeChoices = [
  { label: 'University Course - 80%', value: 'eventType' },
  { label: 'Seminar - 60%', value: 'eventType' },
  { label: 'Certification - 100%', value: 'eventType' },
  {
    label: 'Certification Preparation Class - 70%',
    value: 'eventType',
  },
  { label: 'Technological Training - 90%', value: 'eventType' },
  { label: 'Other - 30%', value: 'eventType' },
];

export function eventToString(event: SubmittedEvent): string {
  return `${event.eventName}:
  \t${event.location}
    \t${event.startDate}
    \t${event.eventType}
    \t${event.gradingType}
    \t${event.totalCost}`;
}

function makeDate(): string {
  let date = new Date();
  let year: string = `${date.getFullYear()}`;
  let month: string = `${date.getMonth() + 1}`;
  let day: string = `${date.getDate()}`;
  if (Number(month) < 10) {
    month = '0' + month;
  }
  if (Number(day) < 10) {
    day = '0' + day;
  }
  return `${year}-${month}-${day}`;
}
