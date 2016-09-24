var express = require('express'),
	app = express(),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	helmet = require('helmet'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	home = require('./routes/home'),
	add = require('./routes/add');
app.set('view engine', 'ejs');
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(home);
app.use(add);
app.use(function(req, res, next) {
	res.status(404).send('Not found!');
});
module.exports = app;