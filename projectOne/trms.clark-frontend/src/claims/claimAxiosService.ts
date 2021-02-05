import { Claim } from './claim';
import axios from 'axios';

class ClaimService {
  private URI: string;
  constructor() {
    this.URI = process.env.REACT_APP_SERVER_URI + 'claims';
  }

  getClaims(): Promise<Claim[]> {
    return axios.get(this.URI).then((result) => result.data);
  }
  getClaim(employee: string, eventName: string): Promise<Claim> {
    return axios
      .get(`${this.URI}/${employee}-${eventName}`)
      .then((result) => result.data);
  }
  getClaimsBySupervisor(supervisor: string): Promise<Claim[]> {
    return axios
      .get(`${this.URI}/${supervisor}`, { withCredentials: true })
      .then((result) => result.data);
  }
  addClaim(r: Claim): Promise<null> {
    return axios.post(this.URI, r).then((result) => null);
  }
  updateClaim(r: Claim): Promise<null> {
    return axios.put(this.URI, r).then((result) => null);
  }

  deleteClaim(employee: string, eventName: string): Promise<null> {
    console.log(`${this.URI}/${employee}-${eventName}`);
    return axios
      .delete(`${this.URI}/${employee}-${eventName}`, { withCredentials: true })
      .then((result) => null);
  }
}
const claimService = new ClaimService();
export default claimService;
