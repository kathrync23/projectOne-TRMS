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
var dynamo_1 = __importDefault(require("../dynamo/dynamo"));
var log_1 = __importDefault(require("../log"));
var ClaimService = /** @class */ (function () {
    function ClaimService() {
        this.doc = dynamo_1.default;
    }
    ClaimService.prototype.getClaims = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'CLAIMS',
                        };
                        return [4 /*yield*/, this.doc
                                .scan(params)
                                .promise()
                                .then(function (data) {
                                return data.Items;
                            })
                                .catch(function (err) {
                                log_1.default.error("getClaims error: " + err);
                                return [];
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClaimService.prototype.getClaim = function (employee, eventName) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'CLAIMS',
                            Key: {
                                employee: employee,
                                eventName: eventName,
                            },
                        };
                        return [4 /*yield*/, this.doc
                                .get(params)
                                .promise()
                                .then(function (data) {
                                log_1.default.trace('Got claim');
                                return data.Item;
                            })
                                .catch(function (err) {
                                log_1.default.error('getClaimed fail: ' + err);
                                return null;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClaimService.prototype.getClaimsByApprover = function (approver) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'CLAIMS',
                            IndexName: 'SupervisorIndex',
                            KeyConditionExpressions: 'approver = :approver',
                            ExpressionAttributeValues: {
                                approver: approver,
                            },
                            ScanIndexForward: false,
                        };
                        return [4 /*yield*/, this.doc
                                .query(params)
                                .promise()
                                .then(function (data) {
                                if (data && data.Items && data.Items.length) {
                                    log_1.default.debug("ClaimsByApprover Data: " + JSON.stringify(data));
                                    return data.Items;
                                }
                                else {
                                    return [];
                                }
                            })
                                .catch(function (err) {
                                log_1.default.error('getClaimsByApprover: ' + err);
                                return [];
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClaimService.prototype.addClaim = function (claim) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'CLAIMS',
                            Item: claim,
                        };
                        return [4 /*yield*/, this.doc
                                .put(params)
                                .promise()
                                .then(function (result) {
                                log_1.default.info('Successfully added claim');
                                return true;
                            })
                                .catch(function (error) {
                                log_1.default.error("addClaim err: " + error);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClaimService.prototype.deleteClaim = function (employee, eventName) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'CLAIMS',
                            Key: {
                                employee: employee,
                                eventName: eventName,
                            },
                        };
                        return [4 /*yield*/, this.doc
                                .delete(params)
                                .promise()
                                .then(function (data) {
                                log_1.default.debug("employee: " + employee + " / eventName: " + eventName);
                                log_1.default.info('deleteClaim: ' + data);
                                return true;
                            })
                                .catch(function (err) {
                                log_1.default.error('deleteClaim: ' + err);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClaimService.prototype.updateClaim = function (claim) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'CLAIMS',
                            Key: {
                                employee: claim.employee,
                                eventName: claim.eventName,
                            },
                            UpdateExpression: 'set #justification=:justification, #approver=:approver,#claimAmount=:claimAmount',
                            ExpressionAttributeValues: {
                                ':justification': claim.justification,
                                ':approver': claim.approver,
                                ':claimAmount': claim.claimAmount,
                            },
                            ExpressionAttributeNames: {
                                '#justification': 'justification',
                                '#approver': 'approver',
                                '#claimAmount': 'claimAmount',
                            },
                            ReturnValue: 'UPDATED_NEW',
                        };
                        return [4 /*yield*/, this.doc
                                .update(params)
                                .promise()
                                .then(function () {
                                log_1.default.info('Successfully updated the claim');
                                return true;
                            })
                                .catch(function (err) {
                                log_1.default.error('Update claim err: ' + err);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ClaimService;
}());
var claimService = new ClaimService();
exports.default = claimService;
