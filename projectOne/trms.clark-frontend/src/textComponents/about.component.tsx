import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUser } from '../actions';
import { UserState } from '../reducer';

interface AboutProps {
  data: string;
}

export function AboutComponent(props: AboutProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectUser = (state: UserState) => state.user;
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUser(user));
  }, []);

  function goToMakeRequest() {
    history.push('/claims/addClaim');
  }
  return (
    <div className='text-cards'>
      <div className='about-card'>
        <h2 className='page-header'>About</h2>
        <p>{aboutHeader}</p>
        <h3 className='about-header'>Rules</h3>
        <p>{rules}</p>
        <h3 className='about-header'>Claim Coverage Rates</h3>
        <li className='claim-coverage'>
          University Courses ..................................... 80%
        </li>
        <li className='claim-coverage'>
          Seminars ........................................................ 60%
        </li>
        <li className='claim-coverage'>
          Certification Preparation Classes ......... 75%
        </li>
        <li className='claim-coverage'>
          Certification ............................................... 100%
        </li>
        <li className='claim-coverage'>
          Technical Training ...................................... 90%
        </li>
        <li className='claim-coverage'>
          Other ..............................................................
          30%
        </li>
        <h3 className='about-header'>Formula Used for Claims</h3>
        <p className='formula'>
          AvailableClaim = TotalClaimAmount - PendingClaims - AwardedClaims
        </p>
        <p>
          In normal terms, your Available Claim will be the the total claim
          amount ($1000) subtracted by your Pending Claims and Approved Claims
          (also known as Awarded Claims).
        </p>
      </div>
      {user.password !== undefined && (
        <button className='generic-button' onClick={goToMakeRequest}>
          Make a Request
        </button>
      )}
    </div>
  );
}
const aboutHeader: string =
  'Welcome to the Tuition Claim Management System (TRMS). The TRMS provides claims for university courses, seminars, certification preparation classes, certifications, and technical training. If you are not logged in, then you cannot make a request.';
const rules: string = `Each Employee is allowed to claim up to $1000 in tuition claim a year which means that the alloted claim value resets on the new year. A projected claim will be adjusted if it exceeds the available claim amount. Claims do not cover materials such as books and similar items. Use the button at the bottom of the page to submit a request.`;
