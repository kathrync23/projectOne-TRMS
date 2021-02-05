import axios from 'axios';
import { SubmittedEvent } from './submittedEvent';

class SubmittedEventService {
  private URI: string;
  constructor() {
    // URL of the express server
    this.URI = process.env.REACT_APP_SERVER_URI + 'submittedEvents';
  }

  getSubmittedEvents(): Promise<SubmittedEvent[]> {
    return axios.get(this.URI).then((result) => result.data);
  }
  getSubmittedEvent(id: string): Promise<SubmittedEvent> {
    return axios
      .get(this.URI + '/' + id)
      .then((result) => result.data)
      .catch((err) => {
        console.log('axios service err: ' + err);
      });
  }
  addSubmittedEvent(r: SubmittedEvent): Promise<null> {
    return axios.post(this.URI, r).then((result) => null);
  }
  updateSubmittedEvent(r: SubmittedEvent): Promise<null> {
    return axios.put(this.URI, r).then((result) => null);
  }

  deletesubmittedEvent(id: string): Promise<null> {
    console.log(id);
    return axios
      .delete(this.URI + '/' + id, { withCredentials: true })
      .then((result) => null);
  }
}

export default new SubmittedEventService();
