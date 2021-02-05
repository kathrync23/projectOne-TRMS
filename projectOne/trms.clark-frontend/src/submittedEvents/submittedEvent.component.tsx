import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../reducer';
import { thunkGetEvents } from '../thunks';
import { eventToString, SubmittedEvent } from './submittedEvent';

interface SubmittedEventProps {
  data: SubmittedEvent;
}

function SubmittedEventComponent(props: SubmittedEventProps) {
  const selectEvent = (state: UserState) => state.submittedEvent;
  const event = useSelector(selectEvent);
  const dispatch = useDispatch();

  console.log('props: ' + props.data);
  console.log('selected event: ' + eventToString(event));

  useEffect(() => {
    dispatch(thunkGetEvents());
  }, [dispatch, props.data]);

  return (
    <div className='event-card'>
      <h3>Events</h3>
      <h4 className='event-name'>{event.eventName}</h4>
      <p>{eventToString(event)}</p>
    </div>
  );
}

export default SubmittedEventComponent;
