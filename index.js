const express = require('express')
const pg = require('pg')
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var events = require('./routes/events');
var stats = require('./routes/stats');
var poi = require('./routes/poi');
var main = require('./routes/main');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/events', events);
app.use('/stats', stats);
app.use('/poi', poi);
app.use('/', main);

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT || 5555, (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	} else {
		console.log(`Running on ${process.env.PORT || 5555}`)
	}
})

// last resorts
process.on('uncaughtException', (err) => {
	console.log(`Caught exception: ${err}`)
	process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
	process.exit(1)
})

module.exports = app;