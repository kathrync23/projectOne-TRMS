"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToString = exports.login = exports.User = void 0;
var log_1 = __importDefault(require("../log"));
var userDBService_1 = __importDefault(require("./userDBService"));
/**
 * User class
 * new User(username: string, password: string, claimReqs: string[], supervisorName: string, claimReqToApprove: string[])
 * username - name to log in with (string)
 * password - password to log in with (string)
 * claimReqs - ids of claim requests that have been made (string[])
 * role - role of employee (string) either 'Employee', 'Direct Supervisor', 'Department Head', 'Benefits Coordinator'
 * supervisor - username of their supervisor (for Employee, dept head for supervisor, benco for dept head, different benco for benco)
 * claimReqsToApprove - ids of claim requests that need to be approved by this person.
 */
var User = /** @class */ (function () {
    function User(username, password, claimReqs, role, supervisorName) {
        if (claimReqs === void 0) { claimReqs = []; }
        if (role === void 0) { role = 'Employee'; }
        var params = [];
        for (var _i = 5; _i < arguments.length; _i++) {
            params[_i - 5] = arguments[_i];
        }
        this.username = username;
        this.password = password;
        this.claimReqs = claimReqs;
        this.role = role;
        this.supervisorName = supervisorName;
        this.claimReqsToApprove = null;
        this.availableAmount = 1000;
        if (role) {
            this.role = role;
        }
        if (role != 'Employee') {
            this.claimReqsToApprove = [];
        }
        this.claimReqsToApprove = params[0];
    }
    return User;
}());
exports.User = User;
/**
 * login attempts a log in for the user using the given
 * username and password.
 * @param username - string
 * @param password - string
 */
function login(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_1.default.info('Attempted a login.');
                    log_1.default.debug("login attempt " + (username + ' ' + password));
                    return [4 /*yield*/, userDBService_1.default
                            .getUserByName(username)
                            .then(function (user) {
                            if (user && user.password === password) {
                                return user;
                            }
                            else {
                                return null;
                            }
                        })
                            .catch(function (err) {
                            log_1.default.error('Error logging in: ' + err);
                            return null;
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.login = login;
function userToString(user) {
    return user.username + ": " + user.password + "\n  Role: " + user.role + " - " + JSON.stringify(user.claimReqs) + "\n  Supervisor: " + user.supervisorName + "\n  ReqsToApprove: " + user.claimReqsToApprove;
}
exports.userToString = userToString;
