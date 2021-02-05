import { Claim, ClaimKey } from './claims/claim';
import * as Actions from './actions';
import { User } from './user/user';
import { SubmittedEvent } from './submittedEvents/submittedEvent';

// Define the items that are in our state
export interface ClaimState {
  submittedEvent: SubmittedEvent;
  claims: Claim[];
  claim: Claim;
}
export interface UserState {
  user: User;
  claimee: User;
  submittedEvent: SubmittedEvent;
  claims: Claim[];
  claim: Claim;
}

export interface ClaimKeyState {
  claimKeys: ClaimKey[];
  claimKey: ClaimKey;
}
export interface AppState extends UserState, ClaimState, ClaimKeyState {}

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

const initialState: AppState = {
  user: new User(),
  claimee: new User(),
  claims: [],
  claim: new Claim(),
  claimKey: new ClaimKey('', ''),
  claimKeys: [],
  submittedEvent: new SubmittedEvent(),
};

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (
  state: AppState = initialState,
  action: Actions.AppAction
): AppState => {
  // We want to call setState. (redux will do that when we return a new state object from the reducer)
  const newState = { ...state }; // If we return this, it will re render the application. (call setState)

  switch (action.type) {
    case Actions.UserActions.GetUser:
      newState.user = action.payload as User;
      newState.claim = new Claim();
      newState.submittedEvent = new SubmittedEvent();
      newState.claimKeys = action.payload.claimReqs as ClaimKey[];
      return newState;
    case Actions.UserActions.LoginChange:
      newState.user = action.payload as User;
      return newState;
    case Actions.ClaimActions.GetClaims:
      newState.claims = action.payload as Claim[];
      return newState;
    case Actions.ClaimActions.ChangeClaim:
      newState.claim = action.payload as Claim;
      return newState;
    case Actions.SubmittedEventActions.ChangeSubmittedEvent:
      newState.submittedEvent = action.payload as SubmittedEvent;
      return newState;
    case Actions.UserActions.ChangeClaimee:
      newState.claimee = action.payload as User;
      return newState;
    case Actions.UserActions.ChangeUser:
      newState.user = action.payload as User;
      return newState;
    default:
      return state;
  }
};

export default reducer;
