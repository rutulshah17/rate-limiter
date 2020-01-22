const express = require("express");
const pg = require("pg");
var path = require('path');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const app = express();

dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html
const pool = new pg.Pool();


const queryHandler = (req, res, next) => {
  //will give the path
  console.log(req.url);
  
  pool
	.query(req.sqlQuery)
	.then(r => {
		const { rows } = r;
		console.log(rows)
		res.render ('demo', {
			result: rows || []
		})
	})
	
	//***sending to demo.ejs */
	//res.send(r.rows);
	//   console.log(r)
	//   res.render('demo', { 
	// 		result: r.rows[0]
	//   });
	// })
	.catch(next);
};


app.get("/", (req, res) => {
  res.send("Welcome to EQ Works 😎");
});

// app.get("/", (req, res) => {
//   res.render('demo')
// });

app.get("/events/hourly", (req, res, next) => {
  //res.send(req.params),
  req.sqlQuery = `
	SELECT date, hour, events
	FROM public.hourly_events
	ORDER BY date, hour
	LIMIT 168;
  `;
	return next();
  },
  queryHandler
);

app.get(
  "/events/daily",
  (req, res, next) => {
	req.sqlQuery = `
	SELECT date, SUM(events) AS events
	FROM public.hourly_events
	GROUP BY date
	ORDER BY date
	LIMIT 7;
  `;
	return next();
  },
  queryHandler
);

app.get(
  "/stats/hourly",
  (req, res, next) => {
	req.sqlQuery = `
	SELECT date, hour, impressions, clicks, revenue
	FROM public.hourly_stats
	ORDER BY date, hour
	LIMIT 168;
  `;
	return next();
  },
  queryHandler
);

app.get(
  "/stats/daily",
  (req, res, next) => {
	req.sqlQuery = `
	SELECT date,
		SUM(impressions) AS impressions,
		SUM(clicks) AS clicks,
		SUM(revenue) AS revenue
	FROM public.hourly_stats
	GROUP BY date
	ORDER BY date
	LIMIT 7;
  `;
	return next();
  },
  queryHandler
);

app.get(
  "/poi",
  (req, res, next) => {
	req.sqlQuery = `
	SELECT *
	FROM public.poi;
  `;
	return next();
  },
  queryHandler
);

app.listen(process.env.PORT || 5555, err => {
  if (err) {
	console.error(err);
	process.exit(1);
  } else {
	console.log(`Running on ${process.env.PORT || 5555}`);
  }
});

// last resorts
process.on("uncaughtException", err => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  process.exit(1);
});
