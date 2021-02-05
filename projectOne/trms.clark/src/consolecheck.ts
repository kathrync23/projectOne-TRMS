import { Claim, ClaimKey, claimToString } from './claims/claim';
import claimService from './claims/claimDBService';
import logger from './log';
import { User, userToString } from './user/user';
import userService from './user/userDBService';

/**
 * Tests that user is received correctly and that you can get the claim
 * from the claimReqs of the User object.
 */
// userService.getUserByName('AliceSmith').then((user) => {
//   if (user) {
//     console.log(userToString(user));
//     let obj: ClaimKey = user.claimReqs[0];
//     console.log(`Employee: ${obj.employee} - EventName: ${obj.eventName}`);

//     claimService
//       .getClaim(obj.employee, obj.eventName)
//       .then((claim) => {
//         if (claim) {
//           console.log('C1: ' + claimToString(claim));
//         }
//       })
//       .then((err) => {
//         logger.error('getClaim failed: ' + err);
//       });
//     claimService.getClaim('BrandonJohnson', 'Course1').then((claim) => {
//       if (claim) {
//         console.log('C2: ' + claimToString(claim));
//       }
//     });
//   }
// });

let user: User = {
  username: 'KathrynClark',
  password: 'asdf',
  claimReqs: [],
  role: 'BenCo',
  claimReqsToApprove: [],
  supervisorName: 'DarinAbilene',
  availableAmount: 2000,
};

user.availableAmount -= 100;
user.claimReqs.push({ eventName: 'new event', employee: user.username });
user.claimReqsToApprove?.push({
  eventName: 'another event',
  employee: 'AliceSmith',
});

userService
  .updateUser(user)
  .then((user) => {
    console.log('User: ' + JSON.stringify(user));
  })
  .catch((err) => {
    console.log('some error');
  });
let claim = new Claim(
  'Course12',
  'BrandonJohnson',
  500,
  'CarrieAnderson',
  'Justification is unnecessary',
  'n/a'
);

claim.approver = 'KathrynClark';
claimService.updateClaim(claim).then();

console.log('ran stuff');
