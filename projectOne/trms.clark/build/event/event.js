"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventToString = exports.SubmittedEvent = void 0;
var SubmittedEvent = /** @class */ (function () {
    function SubmittedEvent() {
        this.eventName = '';
        this.startDate = Date.now();
        this.gradingType = '';
        this.eventType = '';
    }
    return SubmittedEvent;
}());
exports.SubmittedEvent = SubmittedEvent;
function eventToString(event) {
    return event.eventName + ":\n    \t" + event.startDate + "\n    \t" + event.eventType + "\n    \t" + event.gradingType;
}
exports.eventToString = eventToString;
