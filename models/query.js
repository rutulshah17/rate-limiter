const pg = require('pg');

const pool = new pg.Pool()



//function to get the base url so that it could be passed res.render to display views dynamically 
function gettrimmedUrl (url) {
	var str = url;
	var tmp = str.split("/");
	return (tmp.pop());
}

//needs to be updated
function massageDataFromApi( results ) {
	for(result in results) {
		date.push(results[result].date);
		event.push(results[result].events);
	}
}

module.exports = {
	queryHandler: (req, res, next) => {
		pool.query(req.sqlQuery).then((r) => {
			//res.json(r.rows || [])
			console.log(massageDataFromApi(r.rows));
			res.render( gettrimmedUrl(req.baseUrl), { results: r.rows || [] } )
		}).catch(next)
	}
}