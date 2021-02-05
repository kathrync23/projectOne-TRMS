"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reimbursementToString = exports.Reimbursement = void 0;
var Reimbursement = /** @class */ (function () {
    function Reimbursement(idName, eventName, employee) {
        this.idName = idName;
        this.eventName = eventName;
        this.employee = employee;
    }
    return Reimbursement;
}());
exports.Reimbursement = Reimbursement;
function reimbursementToString(reimbursement) {
    return reimbursement.idName + "\n    " + reimbursement.eventName + " - " + reimbursement.employee;
}
exports.reimbursementToString = reimbursementToString;
