"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimKey = exports.claimToString = exports.Claim = void 0;
/**
 * Claim class.
 * Fields: eventName, employee, claimAmount, approver, justification, approverLetter
 */
var Claim = /** @class */ (function () {
    function Claim(eventName, employee, claimAmount, approver, justification, approverLetter) {
        this.eventName = eventName;
        this.employee = employee;
        this.claimAmount = claimAmount;
        this.approver = approver;
        this.justification = justification;
        this.approverLetter = approverLetter;
    }
    return Claim;
}());
exports.Claim = Claim;
function claimToString(claim) {
    return " " + claim.eventName + " - " + claim.employee + "\n  \t" + claim.claimAmount;
}
exports.claimToString = claimToString;
var ClaimKey = /** @class */ (function () {
    function ClaimKey(eventName, employee) {
        this.eventName = eventName;
        this.employee = employee;
    }
    return ClaimKey;
}());
exports.ClaimKey = ClaimKey;
