import { SyntheticEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../reducer';
import claimService from './claimAxiosService';
import { changeClaim, ChangeSubmittedEvent, getUser } from '../actions';
import { Claim, ClaimKey } from './claim';
import {
  eventTypeChoices,
  gradingFormatChoices,
  SubmittedEvent,
} from '../submittedEvents/submittedEvent';
import submittedEventAxiosService from '../submittedEvents/submittedEventAxiosService';
import Select from 'react-select';
import userAxiosService from '../user/userAxiosService';

export function AddClaimComponent() {
  const claimSelector = (state: UserState) => state.claim;
  const claim = useSelector(claimSelector);
  const user = useSelector((state: UserState) => state.user);
  const eventSelector = (state: UserState) => state.submittedEvent;
  const subEvent = useSelector(eventSelector);

  const dispatch = useDispatch();
  const CLAIM_FIELDS = [
    'eventName',
    'justification',
    'approverLetter',
    'claimAmount',
  ];
  const EVENT_FIELDS = [
    'eventType',
    'description',
    'cost',
    'startDate',
    'gradingFormat',
    'location',
  ];
  const history = useHistory();
  // This function is going to handle my onChange event.
  // SyntheticEvent is how React simulates events.
  function handleClaimInput(this: any, e: SyntheticEvent, claim: Claim) {
    let c: any = {
      ...claim,
      employee: user.username,
      approver: user.supervisorName,
    };
    c[
      (e.target as HTMLInputElement).name
    ] = (e.target as HTMLInputElement).value;
    dispatch(changeClaim(c));
    history.push('/claims/addClaim');
  }

  /**
   * handles the event field inputs.
   * @param synthEve
   * @param subEvent
   */
  function handleEventInput(
    synthEve: SyntheticEvent,
    subEvent: SubmittedEvent
  ) {
    let e: any = { ...subEvent, eventName: claim.eventName };
    e[
      (synthEve.target as HTMLInputElement).name
    ] = (synthEve.target as HTMLInputElement).value;
    dispatch(ChangeSubmittedEvent(e));
    history.push('/claims/addClaim');
  }
  const handleSelectionInput = (e: any) => {
    const newEvent = { ...subEvent };
    if (e.value === 'gradingFormat') {
      newEvent.gradingType = e.label;
    } else {
      newEvent.eventType = e.label;
    }
    dispatch(ChangeSubmittedEvent(newEvent));
  };

  function submitForm() {
    if (user.availableAmount - claim.claimAmount >= 0) {
      user.availableAmount -= claim.claimAmount;
    } else {
      claim.claimAmount = user.availableAmount;
      user.availableAmount = 0;
    }

    user.claimReqs.push(new ClaimKey(user.username, claim.eventName));
    claimService
      .addClaim(claim)
      .then(() => {
        dispatch(changeClaim(claim));
        console.log('submit claim: ' + JSON.stringify(claim));
      })
      .catch((err) => {
        console.log('submitForm claim err: ' + err);
      });
    submittedEventAxiosService
      .addSubmittedEvent(subEvent)
      .then(() => {
        dispatch(ChangeSubmittedEvent(subEvent));
        history.push('/claims');
        console.log('submit event: ' + JSON.stringify(subEvent));
      })
      .catch((err) => {
        console.log('submitForm event err: ' + err);
      });
    userAxiosService
      .updateUser(user)
      .then(() => {
        dispatch(getUser(user));
        console.log('submit user: ' + JSON.stringify(user));
      })
      .catch((err) => {
        console.log('submitForm user err: ' + err);
      });
  }
  useEffect(() => {
    dispatch(getUser(user));
  }, [dispatch]);

  return (
    <div className='claim-card'>
      <h2>Make a Claim Form</h2>
      {CLAIM_FIELDS.map((fieldName) => {
        if (fieldName === 'claimAmount') {
          return (
            <div key={'input-field-' + fieldName}>
              <label>{fieldName}</label>
              <input
                type='number'
                className='form-control'
                name={fieldName}
                id={'r_' + fieldName}
                value={(claim as any)[fieldName]}
                onChange={(e) => {
                  handleClaimInput(e, claim);
                }}></input>
              <p>
                *Reminder it can only be a certain percentage based off the
                event type.
              </p>
            </div>
          );
        } else {
          return (
            <div key={'input-field-' + fieldName}>
              <label>{fieldName}</label>
              <input
                type='text'
                className='form-control'
                name={fieldName}
                id={'r_' + fieldName}
                value={(claim as any)[fieldName]}
                onChange={(e) => {
                  handleClaimInput(e, claim);
                }}></input>
            </div>
          );
        }
      })}
      {EVENT_FIELDS.map((fieldName) => {
        if (fieldName === 'gradingFormat') {
          return (
            <>
              <label>Grading Format</label>
              <Select
                options={gradingFormatChoices}
                onChange={handleSelectionInput}
              />
            </>
          );
        } else if (fieldName === 'eventType') {
          return (
            <>
              <label>Event Type</label>
              <Select
                options={eventTypeChoices}
                onChange={handleSelectionInput}
              />
            </>
          );
        } else if (fieldName === 'cost') {
          return (
            <div key={'input-field-' + fieldName}>
              <label>{fieldName}</label>
              <input
                type='number'
                className='form-control'
                name={fieldName}
                id={'r_' + fieldName}
                value={(subEvent as any)[fieldName]}
                onChange={(e) => {
                  handleEventInput(e, subEvent);
                }}></input>
              <p>*This is the total cost of the event.</p>
            </div>
          );
        } else if (fieldName === 'startDate') {
          return (
            <div key={'input-field-' + fieldName}>
              <label>{fieldName}</label>
              <input
                type='date'
                className='form-control'
                name={fieldName}
                id={'r_' + fieldName}
                value={(subEvent as any)[fieldName]}
                onChange={(e) => {
                  handleEventInput(e, subEvent);
                }}></input>
            </div>
          );
        } else {
          return (
            <div key={'input-field-' + fieldName}>
              <label>{fieldName}</label>
              <input
                type='text'
                className='form-control'
                name={fieldName}
                id={'r_' + fieldName}
                value={(subEvent as any)[fieldName]}
                onChange={(e) => {
                  handleEventInput(e, subEvent);
                }}></input>
            </div>
          );
        }
      })}
      <button className='generic-button' onClick={submitForm}>
        Submit Request
      </button>
    </div>
  );
}
