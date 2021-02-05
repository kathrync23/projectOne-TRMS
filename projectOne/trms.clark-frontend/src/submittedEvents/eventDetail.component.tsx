import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventToString } from './submittedEvent';
import { ChangeSubmittedEvent, getUser } from '../actions';
import { UserState } from '../reducer';
import submittedEventService from './submittedEventAxiosService';

interface EventDetailProps {
  match: any;
}

export default function EventDetailComponent(props: EventDetailProps) {
  const eventSelector = (state: UserState) => state.submittedEvent;
  const subEvent = useSelector(eventSelector);
  const userContext = useSelector((state: UserState) => state.user);
  const dispatch = useDispatch();

  dispatch(getUser(userContext));

  useEffect(() => {
    console.log('props detail id: ' + props.match.params.id);
    let keyArr = props.match.params.id.split('-');
    if (keyArr[1].includes('%20')) {
      keyArr[1] = keyArr[1].substring(3);
    }
    console.log('new key' + keyArr[1]);

    submittedEventService
      .getSubmittedEvent(keyArr[1])
      .then((subEvent) => {
        console.log('subevent: ' + JSON.stringify(subEvent));
        dispatch(ChangeSubmittedEvent(subEvent));
      })
      .catch((err) => {
        console.log('SubmittedeventService err: ' + err);
      });
  }, [dispatch, props.match.params.id]);

  return (
    <div className='event-card'>
      <h3 className='event-name'>{subEvent.eventName}</h3>
      <p>{eventToString(subEvent)}</p>
    </div>
  );
}
