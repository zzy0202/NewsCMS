var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const UserRouter = require("./routes/admin/UserRouter")
let JWT = require("./util/JWT")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require("./util/JWT")
app.use((req, res, next) => {
		//specific for login function api
		if (req.url === "/adminAPI/user/login") {
				next();
		}	else {
				let token = req.headers.authorization;
				token = token.split(" ")[1]
				console.log(token);
				let payload = JWT.verify(token);
				if (payload){
						let newToken = JWT.generate({
								_id:payload._id,
								username:payload,
						},"10s");
						res.header("Authorization",newToken);
						next();
				}
				else {
						res.status(401).send({
								msg:"Token expired",
						})
				}
		}
})

app.use('/', indexRouter);
app.use(UserRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
		next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
});

module.exports = app;
