var express = require('express');
var router = express.Router();

// router.get('/', function(req, res) {
//     res.render('main', { title: 'Express' });
// });

router.get('/', (req, res) => {
	res.render('main', { title: 'Main Page' })
})

module.exports = router