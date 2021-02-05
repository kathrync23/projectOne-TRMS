import { SyntheticEvent, useEffect } from 'react';
import claimService from './claimAxiosService';
import { useHistory } from 'react-router-dom';
import { ClaimState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeClaim, changeClaimee, getUser } from '../actions';
import { Claim } from './claim';
import userAxiosService from '../user/userAxiosService';
import { User } from '../user/user';

interface EditProps {
  id: string;
}

export function EditClaimComponent(props: EditProps) {
  const history = useHistory();
  const selectClaim = (state: ClaimState) => state.claim;
  const claim = useSelector(selectClaim);
  const selectUser = (state: UserState) => state.user;
  const user = useSelector(selectUser);
  const selectClaimee = (state: UserState) => state.claimee;
  const claimee = useSelector(selectClaimee);
  const dispatch = useDispatch();
  useEffect(() => {
    claimService.getClaim(claim.employee, claim.eventName).then((claim) => {
      dispatch(changeClaim(claim));
      userAxiosService.getUser(claim.employee).then((receivedUser) => {
        dispatch(changeClaimee(claimee));
        console.log('Claimee' + JSON.stringify(claimee));

        if (receivedUser && receivedUser.availableAmount) {
          receivedUser.availableAmount += claim.claimAmount;
        }
      });
      console.log('pre submit: ' + user.availableAmount);
    });
  }, [dispatch]);
  const FIELDS = ['claimAmount', 'approver', 'justification'];

  function handleFormInput(e: SyntheticEvent) {
    let r: any = { ...claim };
    r[
      (e.target as HTMLInputElement).name
    ] = (e.target as HTMLInputElement).value;
    dispatch(changeClaim(r));
  }
  function submitForm() {
    if (user.role === 'Employee') {
      claim.approver = user.supervisorName;
    }
    console.log('claimee submit: ' + JSON.stringify(claimee));

    console.log('post submit pre change: ' + claimee.availableAmount);

    if (claimee.availableAmount - claim.claimAmount >= 0) {
      claimee.availableAmount -= claim.claimAmount;
      console.log('post submit post change sub: ' + claimee.availableAmount);
    } else {
      claim.claimAmount = claimee.availableAmount;
      claimee.availableAmount = 0;
      console.log('post submit post change set 0: ' + claimee.availableAmount);
    }
    claimService.updateClaim(claim).then(() => {
      dispatch(changeClaim(claim));
      console.log('Updating claim!');
      history.push('/claims');
    });
    userAxiosService
      .updateUser(claimee)
      .then(() => {
        dispatch(getUser(claimee));
        console.log('submit user: ' + JSON.stringify(user));
      })
      .catch((err) => {
        console.log('submitForm user err: ' + err);
      });
  }
  return (
    <div className='col claim card'>
      <h5>Event Name: {claim.eventName}</h5>
      <p className='info'>
        Claim Amount: {claim.claimAmount}. Employee: {claim.employee}.
        Justification: {claim.justification}
      </p>
      {FIELDS.map((fieldName) => {
        {
          if (fieldName === 'claimAmount') {
            return (
              <div>
                <label>{fieldName}</label>
                <input
                  type='number'
                  className='form-control'
                  name={fieldName}
                  id={'r_' + fieldName}
                  value={(claim as any)[fieldName]}
                  onChange={handleFormInput}></input>
              </div>
            );
          } else if (fieldName === 'approver') {
            if (user.role !== 'Employee') {
              return (
                <div key={'input-field-' + fieldName}>
                  <label>{fieldName}</label>
                  <input
                    type='text'
                    className='form-control'
                    name={fieldName}
                    id={'r_' + fieldName}
                    value={(claim as any)[fieldName]}
                    onChange={handleFormInput}></input>
                </div>
              );
            }
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
                  onChange={handleFormInput}></input>
              </div>
            );
          }
        }
      })}
      <button className='btn btn-primary' onClick={submitForm}>
        Submit Edited Claim
      </button>
    </div>
  );
}
