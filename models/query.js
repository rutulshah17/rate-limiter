const pg = require('pg');

const pool = new pg.Pool()

//function to get the base url so that it could be passed res.render to display views dynamically 
function gettrimmedUrl (url) {
	var str = url;
	var tmp = str.split("/");
	return (tmp.pop());
}

module.exports = {
	queryHandler: (req, res, next) => {
		console.log(req.baseUrl);
		pool.query(req.sqlQuery).then((r) => {
        	//res.json(r.rows || [])
			res.render( gettrimmedUrl(req.baseUrl), { results: r.rows || []} )
			
		}).catch(next)
	}
}