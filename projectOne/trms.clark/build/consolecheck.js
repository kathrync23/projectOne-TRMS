"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var claim_1 = require("./claims/claim");
var claimDBService_1 = __importDefault(require("./claims/claimDBService"));
var userDBService_1 = __importDefault(require("./user/userDBService"));
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
var user = {
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
(_a = user.claimReqsToApprove) === null || _a === void 0 ? void 0 : _a.push({
    eventName: 'another event',
    employee: 'AliceSmith',
});
userDBService_1.default
    .updateUser(user)
    .then(function (user) {
    console.log('User: ' + JSON.stringify(user));
})
    .catch(function (err) {
    console.log('some error');
});
var claim = new claim_1.Claim('Course12', 'BrandonJohnson', 500, 'CarrieAnderson', 'Justification is unnecessary', 'n/a');
claim.approver = 'KathrynClark';
claimDBService_1.default.updateClaim(claim).then();
console.log('ran stuff');
