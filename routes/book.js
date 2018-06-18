var express = require('express');
var router = express.Router();
var fs = require('fs')


module.exports = function(app, db) {

	router.get('/remove/:id', function(req, res) {
		fs.readFile('./db.json', function(err, data) {
			if (err) {
				res.send({
					message: "Can not read file",
					status: false
				})
			} else {
				var json = JSON.parse(data).posts 
				var newJson = {
					posts: []
				}
				for(let elem of json) {
					if(elem.id != req.params.id) {
						newJson.posts.push(elem)
					}
				}
				fs.writeFile('./db.json', JSON.stringify(newJson), function(err){
				if(err) {
						res.send({
							message: 'Can note remove file',
							status: false
						})
				} else {
						res.send({
							message: 'File removed',
							status: true
						})
					}
				})
				
			}
			
		});
	});

	router.get('/search/:title', function(req, res) {
		fs.readFile('./db.json', function(err, data) {
			if (err) {
				res.send({
					message: "Can not read file",
					status: false
				})
			} else {
				var json = JSON.parse(data).posts 
				var books = []
				for(let elem of json) {
					if(elem.id == req.params.title) {
						books.push(elem)
					}
				}
				res.send(books)
				}
			});
		});

	router.get('/add', function(req, res) {
		res.render('add',{})
		});

	router.post('/add', function(req, res) {
		fs.readFile('./db.json', function(err, data) {
			if (err) {
				res.send({
					message: "Can not read file",
					status: false
				})
			} else {
				var newJson = {
					posts: []
				}
				var json = JSON.parse(data).posts
				var schet = 1
				var prov = false
				var id = null
				// Find null id
				for(let elem of json){
					if(elem.id != schet){
						id = schet
						prov = true
						break
					}
					schet++
				}
				if (!prov){
					id = schet++
				}
				for(let elem of json) {
					newJson.posts.push(elem)
					}
				newJson.posts.push({
					"id": id,
					"title": req.body.title,
					"author": req.body.author,
					"description": req.body.description
				})
				fs.writeFile('./db.json', JSON.stringify(newJson), function(err){
					//res.redirect('/')
				if(err) {
						res.send({
							message: 'Can note add book',
							status: false
						})
				} else {
						res.send({
							message: 'Book add',
							status: true
						})
					}
				})
			}
		})
	})

	app.use('/book', router);
};
/*
var multer = require('multer');
var upload = multer({dest: './public/img'});

router.post('/’',upload.any(), function(req, res, next) {}
req.files[0].filename

*/
