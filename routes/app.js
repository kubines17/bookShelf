var express = require('express');
var router = express.Router();
var fs = require('fs')

module.exports = function(app){
	router.get('/', async function(req, res) {
		res.send('test')
	})
	app.use('/', router);
};
