var express = require('express');
var router = express.Router();
var query = require ('../models/query');

// "localhost:5555/stats/hourly"
router.get('/hourly', (req, res, next) => {
	req.sqlQuery = `
		SELECT date, hour, impressions, clicks, revenue
		FROM public.hourly_stats
		ORDER BY date, hour
		LIMIT 168;
	`
	return next()
}, query.queryHandler)

// "localhost:5555/stats/daily"
router.get('/daily', (req, res, next) => {
	req.sqlQuery = `
		SELECT date,
				SUM(impressions) AS impressions,
				SUM(clicks) AS clicks,
				SUM(revenue) AS revenue
		FROM public.hourly_stats
		GROUP BY date
		ORDER BY date
		LIMIT 7;
	`
	return next()
}, query.queryHandler)


module.exports = router;