var express = require('express');
var router = express.Router();
var fs = require('fs')


module.exports = function(app, db) {

	router.get('/all', function(req, res) {
		fs.readFile('./db.json', function(err, data) {
			if (err) {
				res.send({
					message: "Can not read file",
					status: false
				})
			} else {
				var json = JSON.parse(data) 
				res.send(json)
			}
			
		});
	});

	router.get('/book/:id', function(req, res) {
		fs.readFile('./db.json', function(err, data) {
			if (err) {
				res.send({
					message: "Can not read file",
					status: false
				})
			} else {
				var found = false
				var result = null
				var json = JSON.parse(data).posts 
				for(let elem of json) {
					if(elem.id == req.params.id) {
						found = true
						result = elem //save elem
						result.status = true
					}
				}
				if(found) {
					res.send(result) //send saved elem
				} else {
					res.send({
						message: 'No book with such id',
						status: false
					})
				}
			}
			
		});
	});


	app.use('/get', router);
};