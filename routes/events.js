var express = require('express');
var router = express.Router();
var query = require ('../models/query');


// "localhost:5555/events/hourly"
router.get('/hourly', (req, res, next) => {
	req.sqlQuery = `
	SELECT date, hour, events
	FROM public.hourly_events
	ORDER BY date, hour
	LIMIT 168`;
	return next()
	//res.render('events', {result: (query.queryHandler) } )
}, query.queryHandler);


// "localhost:5555/events/daily"
router.get('/daily', (req, res, next) => {
	req.sqlQuery = `
		SELECT date, SUM(events) AS events
		FROM public.hourly_events
		GROUP BY date
		ORDER BY date
		LIMIT 7;`
	return next()
}, query.queryHandler);


module.exports = router;