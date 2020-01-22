var express = require('express');
var router = express.Router();
const pg = require('pg');

const pool = new pg.Pool()

const queryHandler = (req, res, next) => {
	pool.query(req.sqlQuery).then((r) => {
        res.json(r.rows || [])
	}).catch(next)
}

router.get('/hourly', (req, res, next) => {
    sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168`;
    
    pool.query(sqlQuery).then((r) => {
        res.render( 'events', {results: r.rows || []})
    })
})

router.get('/daily', (req, res, next) => {
	req.sqlQuery = `
		SELECT date, SUM(events) AS events
		FROM public.hourly_events
		GROUP BY date
		ORDER BY date
        LIMIT 7;`
	return next()
}, queryHandler)

module.exports = router;