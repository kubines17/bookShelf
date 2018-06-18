var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

	router.get('/', function(req, res) {
		res.render('index', {})
	});

	router.get('/single/:id', function(req, res) {
		res.render('single',{})
		});

	router.get('/add', function(req, res) {
		res.render('add',{})
		});
	
	app.use('/', router);
};
