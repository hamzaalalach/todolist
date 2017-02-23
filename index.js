var express = require('express'),
	app = express(),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	helmet = require('helmet'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	passport = require('./bin/auth'),
	home = require('./routes/home'),
	dashboard = require('./routes/dashboard'),
	add = require('./routes/add'),
	edit = require('./routes/edit'),
	remove = require('./routes/remove'),
	login = require('./routes/login'),
	register = require('./routes/register');
app.set('view engine', 'ejs');
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '/public/images/favicon.png')));
app.use(logger(':method :url :status :response-time ms :remote-addr'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(home),
app.use(login);
app.use(register);
app.use(dashboard);
app.use(add);
app.use(remove);
app.use(edit);
app.use(function(req, res, next) {
	res.status(404).send('Not found!');
});
module.exports = app;