import { useSelector } from 'react-redux';
import { UserState } from '../reducer';

export function ClaimAmountComponent() {
  const selectUser = (state: UserState) => state.user;
  const user = useSelector(selectUser);
  return (
    <div className='text-cards'>
      <div className='contact-card'>
        <h2>Your Account Information</h2>
        <p>
          You have ${user.availableAmount} in available reimbursement funds.
          Your supervisor is {user.supervisorName}. Your role is {user.role}.
        </p>
      </div>
    </div>
  );
}
