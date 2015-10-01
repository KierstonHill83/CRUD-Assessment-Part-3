var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/projects.js');

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Add a Project' });
});

// GET ALL projects
router.get('/projects', function(req, res, next) {
	Project.find({}, function(err, project) {
		if(err) {
			res.json({'ERROR': err});
		} else {
			res.json(project);
		}
	});
});


// GET single project
router.get('/project/:id', function(req, res, next) {
	Project.findById(req.params.id, function(err, project) {
		if(err) {
			res.json({'ERROR': err});
		} else {
			res.json(project);
		}
	});
});


// POST ALL projects
router.post('/projects', function(req, res, next) {
	console.log('test');
	var newProject = new Project({
		name: req.body.name,
		description: req.body.description,
		tags: req.body.tags,
		group: req.body.group,
		group_members: req.body.group_members
	});
	console.log(newProject);
	newProject.save(function(err, project) {
		console.log('after save');
		if(err) {
			console.log('after err');
			res.json({'ERROR': err});
		} else {
			res.json(project);
		}
	});
});


// PUT single project

// DELETE single project

module.exports = router;