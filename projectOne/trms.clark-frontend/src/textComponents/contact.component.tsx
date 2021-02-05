import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserState } from '../reducer';

interface ContactProps {
  data: string;
}

export function ContactComponent(props: ContactProps) {
  const history = useHistory();
  const selectUser = (state: UserState) => state.user;
  const user = useSelector(selectUser);
  function goToMakeRequest() {
    history.push('/claims/addClaim');
  }
  return (
    <div className='text-cards'>
      <div className='contact-card'>
        <h2>Contact</h2>
        <p>{contactHeader}</p>
        {user.password !== undefined && (
          <button className='generic-button' onClick={goToMakeRequest}>
            Make a Request
          </button>
        )}
      </div>
    </div>
  );
}

const contactHeader: string = `If you have any questions about your request, please reach out to your direct supervisor. Under View My Claims, you can see who it is currently getting approved by. Click the button to make a request for reimbursement. If there is no button, please log in first. Thank you.`;
