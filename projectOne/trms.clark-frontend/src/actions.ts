import { Claim } from './claims/claim';
import { SubmittedEvent } from './submittedEvents/submittedEvent';
import { User } from './user/user';

export enum UserActions {
  GetUser = 'GET_USER',
  LoginChange = 'CHANGE_LOGIN',
  ChangeClaimee = 'CHANGE_CLAIMEE',
  ChangeUser = 'CHANGE_USER',
}

export enum ClaimActions {
  GetClaims = 'GET_CLAIMS',
  ChangeClaim = 'CHANGE_CLAIM',
}

export enum SubmittedEventActions {
  GetSubmittedEvents = 'GET_SUBMITTED_EVENTS',
  ChangeSubmittedEvent = 'CHANGE_SUBMITTED_EVENTS',
}

export interface AppAction {
  type: string;
  payload: any;
}

export interface UserAction extends AppAction {
  type: UserActions;
  payload: User;
}

export interface ClaimAction extends AppAction {
  type: ClaimActions;
  payload: Claim | Claim[];
}

export interface SubmittedEventAction extends AppAction {
  type: SubmittedEventActions;
  payload: SubmittedEvent | SubmittedEvent[];
}

export function getUser(user: User): UserAction {
  const action: UserAction = {
    type: UserActions.GetUser,
    payload: user,
  };
  return action;
}

export function changeLogin(): UserAction {
  const action: UserAction = {
    type: UserActions.LoginChange,
    payload: new User(),
  };
  return action;
}

export function changeClaimee(user: User): UserAction {
  const action: UserAction = {
    type: UserActions.ChangeClaimee,
    payload: user,
  };
  return action;
}

export function changeUser(user: User): UserAction {
  const action: UserAction = {
    type: UserActions.ChangeUser,
    payload: user,
  };
  return action;
}

export function getClaims(claims: Claim[]): ClaimAction {
  const action: ClaimAction = {
    type: ClaimActions.GetClaims,
    payload: claims,
  };
  return action;
}

export function changeClaim(claim: Claim): ClaimAction {
  const action: ClaimAction = {
    type: ClaimActions.ChangeClaim,
    payload: claim,
  };
  return action;
}

export function getSubmittedEvents(
  subEvent: SubmittedEvent[]
): SubmittedEventAction {
  const action: SubmittedEventAction = {
    type: SubmittedEventActions.GetSubmittedEvents,
    payload: subEvent,
  };
  return action;
}

export function ChangeSubmittedEvent(
  subEvent: SubmittedEvent
): SubmittedEventAction {
  const action: SubmittedEventAction = {
    type: SubmittedEventActions.ChangeSubmittedEvent,
    payload: subEvent,
  };
  return action;
}
