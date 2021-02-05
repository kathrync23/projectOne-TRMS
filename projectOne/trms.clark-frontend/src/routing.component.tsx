import React from 'react';
import {
  Route,
  BrowserRouter,
  Link,
  useHistory,
  Redirect,
  useLocation,
} from 'react-router-dom';
import LoginComponent from './user/login.component';
import userService from './user/userAxiosService';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from './reducer';
import { ClaimComponent } from './claims/claim.component';
import ClaimDetailComponent from './claims/claimDetail.component';
import { AboutComponent } from './textComponents/about.component';
import { AddClaimComponent } from './claims/addClaim.component';
import { ContactComponent } from './textComponents/contact.component';
import { ClaimAmountComponent } from './textComponents/claimAmount.component';
import SubmittedEventComponent from './submittedEvents/submittedEvent.component';
import EventDetailComponent from './submittedEvents/eventDetail.component';
import ErrorBoundaryComponent from './error.component';
import { changeLogin } from './actions';
import { Nav, Navbar } from 'react-bootstrap';
import { EditClaimComponent } from './claims/editClaim.component';

export default function RouterComponent() {
  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  function logout() {
    history.push('/about');
    userService.logout().then(() => {
      dispatch(changeLogin());
    });
  }
  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>
            TRMS
            <p className='bio'>Tuition Reimbursement Management System</p>
            <p className='bio'>By Kathryn Clark</p>
          </h1>
          <Navbar id='nav'>
            <Nav className='mr-auto'>
              {user && user.role === 'BenCo' && (
                <Nav.Link href='allClaimRequests' className='nav-link'>
                  <Link to='/claims'>View All Claim Requests</Link>
                </Nav.Link>
              )}
              <>
                <Nav.Link href='about' className='nav-link'>
                  <Link to='/about' className='urls'>
                    About
                  </Link>
                </Nav.Link>
                <Nav.Link href='contact' className='nav-link'>
                  <Link to='/contact' className='urls'>
                    Contact
                  </Link>
                </Nav.Link>
                {user && user.username ? (
                  <>
                    <Nav.Link href='myClaimRequests' className='nav-link'>
                      <Link to='/claims' className='urls'>
                        View My Claim Requests
                      </Link>
                    </Nav.Link>
                    <p className='welcome'> Welcome Back {user.username}</p>
                    <button className='generic-button' onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <Nav.Link href='login' className='nav-link'>
                    <Link to='/login' className='urls'>
                      Login
                    </Link>
                  </Nav.Link>
                )}
              </>
            </Nav>
          </Navbar>
        </header>
        <ErrorBoundaryComponent key={location.pathname}>
          <Route
            exact
            path='/'
            render={() => <Redirect to='/about'></Redirect>}
          />
          <Route path='/claims' component={ClaimAmountComponent} />
          <Route exact path='/claims' component={ClaimComponent} />
          <Route path='/login' component={LoginComponent} />
          <Route exact path='/claims/:id' component={ClaimDetailComponent} />
          <Route path='/about' component={AboutComponent} />
          <Route path='/contact' component={ContactComponent} />
          <Route exact path='/claims/addClaim' component={AddClaimComponent} />
          <Route path='/logout' component={AboutComponent} />
          <Route path='/submittedEvents:id' component={EventDetailComponent} />
          <Route path='/submittedEvents' component={SubmittedEventComponent} />
          <Route exact path='/' component={AboutComponent} />
          <Route exact path='/claims/:id/edit' component={EditClaimComponent} />
        </ErrorBoundaryComponent>
      </div>
    </BrowserRouter>
  );
}
