var express = require('express');
var router = express.Router();
var query = require ('../models/query');


// "localhost:5555/poi"
router.get('/', (req, res, next) => {
	req.sqlQuery = `
		SELECT *
		FROM public.poi;
	`
	return next()
}, query.queryHandler)

module.exports = router;