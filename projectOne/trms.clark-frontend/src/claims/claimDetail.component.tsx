import { ClaimState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import claimAxiosService from './claimAxiosService';
import {
  changeClaim,
  ChangeSubmittedEvent,
  changeClaimee,
  getUser,
  changeUser,
} from '../actions';
import { Claim } from './claim';
import submittedEventAxiosService from '../submittedEvents/submittedEventAxiosService';
import userAxiosService from '../user/userAxiosService';

interface ClaimDetailProps {
  match: any;
}

export default function ClaimDetailComponent(props: ClaimDetailProps) {
  const claim = useSelector((state: ClaimState) => state.claim);
  const user = useSelector((state: UserState) => state.user);
  const submittedEvent = useSelector(
    (state: UserState) => state.submittedEvent
  );
  const selectClaimee = (state: UserState) => state.claimee;
  const claimee = useSelector(selectClaimee);
  const dispatch = useDispatch();
  const history = useHistory();

  //Employee-EventName => ['Employee', 'EventName']
  let keyArr = props.match.params.id.split('-');
  useEffect(() => {
    dispatch(getUser(user));
    claimAxiosService
      .getClaim(keyArr[0], keyArr[1])
      .then((claim) => {
        dispatch(changeClaim(claim));
      })
      .catch((err) => {
        console.log('claimservice get claim err: ' + err);
      });
    submittedEventAxiosService
      .getSubmittedEvent(keyArr[1])
      .then((submittedEvent) => {
        dispatch(ChangeSubmittedEvent(submittedEvent));
      })
      .catch((err) => {
        console.log('submittedEvent get event err: ' + err);
      });
    userAxiosService
      .getUser(claim.employee)
      .then((receivedUser) => {
        dispatch(changeClaimee(claimee));
        console.log('Claimee' + JSON.stringify(claimee));
      })
      .catch((err) => {
        console.log('Error getting claimee: ' + err);
      });
  }, []);

  function goToEdit(e: any, claim: Claim) {
    history.push(`/claims/${claim.employee}-${claim.eventName}/edit`);
  }

  function handleDelete() {
    console.log('pre delete availAmount: ' + user.availableAmount);

    claimAxiosService.getClaim(keyArr[0], keyArr[1]).then((claim) => {
      if (user.availableAmount + claim.claimAmount <= 1000) {
        user.availableAmount = user.availableAmount + claim.claimAmount;
      } else {
        user.availableAmount = 1000;
      }
      console.log('post delete availAmount: ' + user.availableAmount);
      userAxiosService.updateUser(user).then(() => {
        dispatch(changeUser(user));
      });
    });

    claimAxiosService.deleteClaim(keyArr[0], keyArr[1]).then(() => {
      dispatch(changeClaim(new Claim()));
    });
    user.claimReqs = user.claimReqs.filter(
      (data) => data.eventName !== claim.eventName
    );
    history.push('/claims');
  }

  function handleApproval(e: any, claim: Claim) {
    console.log('Approval button clicked');
    if (user.role !== 'BenCo') {
      claim.approver = user.supervisorName;
    } else {
      claim.approver = 'Approved';
    }
    user.claimReqs = user.claimReqs.filter(
      (data) => data.eventName !== claim.eventName
    );
    claimAxiosService
      .updateClaim(claim)
      .then(() => {
        dispatch(changeClaim(claim));
        console.log('approval claim: ' + JSON.stringify(claim));
      })
      .catch((err) => {
        console.log(`Claim did not update.`);
      });
    userAxiosService.updateUser(user).then(() => {
      dispatch(changeClaimee(user));
    });
    history.push('/claims');
  }

  function handleDeny(e: any, claim: Claim) {
    claim.approver = 'Denied';
    console.log('Pre change: ' + claimee.availableAmount);
    claimee.availableAmount =
      Number(claimee.availableAmount) + Number(claim.claimAmount);
    console.log('Post change: ' + claimee.availableAmount);

    claimAxiosService
      .updateClaim(claim)
      .then(() => {
        dispatch(changeClaim(claim));
      })
      .catch((err) => {
        console.log('Claim did not update. Error: ' + err);
      });
    userAxiosService
      .updateUser(claimee)
      .then(() => {
        dispatch(changeClaim(claim));
      })
      .catch((err) => {
        console.log('User did not update. Error: ' + err);
      });
  }

  return (
    <div className='col-claim-card'>
      <div className='card-body'>
        <h4 className='title'>{claim.eventName}</h4>
        <p className='claim-body'>Employee: {claim.employee}</p>
        <p className='claim-body'>Approver: {claim.approver}</p>
        <p className='claim-body'>ApproverLetter: {claim.approverLetter}</p>
        <p className='claim-body'>Claim Amount: {claim.claimAmount}</p>
        <p className='claim-body'>Event Name: {claim.eventName}</p>
        <p className='claim-body'>Justification: {claim.justification}</p>
        <h5 className='title'>{submittedEvent.eventName}</h5>
        <p className='event-body'>Event Type: {submittedEvent.eventType}</p>
        <p className='event-body'>Grading Type: {submittedEvent.gradingType}</p>
        <p className='event-body'>Location: {submittedEvent.location}</p>
        <p className='event-body'>Total Cost: {submittedEvent.totalCost}</p>
      </div>
      {user.username === claim.approver && (
        <button
          className='generic-button'
          onClick={(e) => {
            goToEdit(e, claim);
          }}>
          Edit Claim
        </button>
      )}
      {user.username === claim.approver && (
        <>
          <button
            className='generic-button'
            onClick={(e) => {
              handleApproval(e, claim);
            }}>
            Approve Claim
          </button>
          <button
            className='generic-button'
            onClick={(e) => {
              handleDeny(e, claim);
            }}>
            Deny Claim
          </button>
        </>
      )}

      {user.username === claim.employee && (
        <button className='generic-button' onClick={handleDelete}>
          Delete Claim
        </button>
      )}
    </div>
  );
}
