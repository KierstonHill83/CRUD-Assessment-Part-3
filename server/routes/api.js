var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var Project = require('../models/projects.js');


// GET ALL projects
router.get('/projects', function(req, res, next) {
	Project.find({}, function(err, project) {
		if(err) {
			res.json({'ERROR': err});
		} else {
			// res.json(project);
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
	var newProject = new Project({
		name: req.body.name,
		description: req.body.description,
		tags: req.body.tags,
		group: req.body.group,
		group_members: req.body.group_members,
		github: req.body.github
	});
	newProject.save(function(err, project) {
		if(err) {
			res.json({'ERROR': err});
		} else {
			res.json({'SUCCESS': project});
		}
	});
});


// PUT single project
router.put('/project/:id', function(req, res, next) {
	Project.findById(req.params.id, function(err, project) {
		project.name = req.body.name;
		project.description = req.body.description;
		project.tags = req.body.tags;
		project.group = req.body.group;
		project.group_members = req.body.group_members;
		project.github = req.body.github;
		project.save(function(err) {
			if(err) {
			res.json({'ERROR': err});
			} else {
			res.json({'UPDATED': project});
			}
		});
	});
});


// DELETE single project
router.delete('/project/:id', function(req, res, next) {
	Project.findByIdAndRemove(req.params.id, function(err, project) {
		if(err) {
			res.json({'ERROR': err});
		} else {
			res.json({'REMOVED': project});
		}
	});
});

module.exports = router;