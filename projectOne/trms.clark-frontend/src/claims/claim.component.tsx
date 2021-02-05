import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';

import { Claim, claimToString } from './claim';
import { ClaimState, UserState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetClaims } from '../thunks';

interface ClaimProps {
  data: Claim[];
}

export function ClaimComponent(props: ClaimProps) {
  const history = useHistory();
  const selectClaim = (state: ClaimState) => state.claims;
  const claims = useSelector(selectClaim);
  const selectUser = (state: UserState) => state.user;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  function goToClaim(event: any, chosenClaim: Claim) {
    history.push(`/claims/${chosenClaim.employee}-${chosenClaim.eventName}`);
  }

  function goToEvent(e: any, eventName: string) {
    history.push(`/submittedEvents/${eventName}`);
  }

  useEffect(() => {
    dispatch(thunkGetClaims());
  }, [dispatch]);

  return (
    <div className='claim-card'>
      <h2>Your Claims</h2>
      {claims.map((claim) => {
        return (
          <div>
            {user.username === claim.employee ? (
              <>
                <h5>Event Name: {claim.eventName}</h5>
                <p className='info'>
                  Claim Amount: {claim.claimAmount}. Current Approver:{' '}
                  {claim.approver}. Justification: {claim.justification}
                  <button
                    className='generic-button'
                    onClick={(e) => {
                      goToClaim(e, claim);
                    }}>
                    View Claim
                  </button>
                  <button
                    className='generic-button'
                    onClick={(e) => {
                      goToEvent(e, claim.eventName);
                    }}>
                    View Event
                  </button>
                </p>
              </>
            ) : (
              <p />
            )}
          </div>
        );
      })}
      <h2>Claims Needing Approval</h2>
      {claims.map((claim) => {
        return (
          <div>
            {user.username === claim.approver ? (
              <>
                <h5>
                  Event Name: {claim.eventName} - Employee: {claim.employee}
                </h5>
                <p className='info'>
                  Claim Amount: {claim.claimAmount}. Current Approver:{' '}
                  {claim.approver}. Justification: {claim.justification}
                  <button
                    className='generic-button'
                    onClick={(e) => {
                      goToClaim(e, claim);
                    }}>
                    View Claim
                  </button>
                  <button
                    className='generic-button'
                    onClick={(e) => {
                      goToEvent(e, claim.eventName);
                    }}>
                    View Event
                  </button>
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}
