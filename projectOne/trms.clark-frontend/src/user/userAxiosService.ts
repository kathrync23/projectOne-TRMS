import axios from 'axios';
import { User } from './user';

class UserService {
  private URI: string;
  constructor() {
    // URL of the express server
    this.URI = process.env.REACT_APP_SERVER_URI + 'users';
  }
  getLogin(): Promise<User> {
    // withCredentials sends our cookies with the request.
    return axios.get(this.URI, { withCredentials: true }).then((result) => {
      console.log(result);
      return result.data;
    });
  }

  login(user: User): Promise<User> {
    console.log('user: ' + JSON.stringify(user));
    console.log('this.URI' + this.URI);
    return axios
      .post(this.URI, user, { withCredentials: true })
      .then((result) => result.data);
  }
  logout(): Promise<null> {
    return axios
      .delete(this.URI, { withCredentials: true })
      .then((result) => null);
  }

  updateUser(user: User): Promise<null> {
    return axios.put(this.URI, user).then((result) => null);
  }

  getUser(username: string): Promise<User> {
    console.log('getUser URI:' + this.URI);
    return axios.get(`${this.URI}/${username}`).then((result) => {
      console.log('Result getUser: ' + JSON.stringify(result));
      return result.data;
    });
  }
}
export default new UserService();
