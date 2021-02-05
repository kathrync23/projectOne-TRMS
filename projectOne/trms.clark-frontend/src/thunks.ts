import { AppState } from './reducer';
import { AppAction, getClaims, getSubmittedEvents } from './actions';
import { ThunkAction } from 'redux-thunk';
import claimService from './claims/claimAxiosService';
import submittedEventAxiosService from './submittedEvents/submittedEventAxiosService';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AppAction
>;

export const thunkGetClaims = (): AppThunk => async (dispatch) => {
  const asyncResp = await claimService.getClaims();
  dispatch(getClaims(asyncResp));
};

export const thunkGetEvents = (): AppThunk => async (dispatch) => {
  const asyncResp = await submittedEventAxiosService.getSubmittedEvents();
  dispatch(getSubmittedEvents(asyncResp));
};
