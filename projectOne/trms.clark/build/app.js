"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var express_session_1 = __importDefault(require("express-session"));
var memorystore_1 = __importDefault(require("memorystore"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var user_router_1 = __importDefault(require("./user/user.router"));
var index_1 = __importDefault(require("./staticrouter/index"));
var claimRouter_1 = __importDefault(require("./claims/claimRouter"));
var submittedEvent_router_1 = __importDefault(require("./event/submittedEvent.router"));
dotenv_1.default.config();
var app = express_1.default();
// view engine setup
app.use(cors_1.default({
    origin: [process.env.CLIENT],
    credentials: true,
}));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('/'));
app.use(express_session_1.default({
    secret: 'whatever',
    store: new (memorystore_1.default(express_session_1.default))({ checkPeriod: 86400000 }),
    cookie: {},
}));
/**
 * Sets routers
 */
app.use('/', index_1.default);
app.use('/users', user_router_1.default);
app.use('/claims', claimRouter_1.default);
app.use('/submittedEvents', submittedEvent_router_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send('error');
});
module.exports = app;
