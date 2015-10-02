process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Project = require('../server/models/projects');

var should = chai.should();
chai.use(chaiHttp);


describe('Projects', function() {
	Project.collection.drop();

	beforeEach(function(done) {
		var newProject = new Project ({
			name: 'Translator',
			description: 'translate',
			tags: ['node'],
			group: true,
			group_members: ['sarah']
		});
		newProject.save(function(err) {
			done();
		});
	});
	afterEach(function(done) {
		Project.collection.drop();
		done();
	});


	it('should list ALL projects on /projects GET', function(done) {
		chai.request(server)
			.get('/api/v1/projects')
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body[0].should.have.property('_id');
				res.body[0].should.have.property('name');
				res.body[0].should.have.property('description');
				res.body[0].should.have.property('tags');
				res.body[0].should.have.property('group');
				res.body[0].should.have.property('group_members');
				res.body[0].name.should.equal('Translator');
				res.body[0].description.should.equal('translate');
				res.body[0].tags.should.deep.equal(['node']);
				res.body[0].tags[0].should.equal('node');
				res.body[0].group.should.equal(true);
				res.body[0].group_members.should.deep.equal(['sarah']);
				res.body[0].group_members[0].should.equal('sarah');
				done();
			});
	});


	it('should list a SINGLE project on /project/<id> GET', function(done) {
		var newProject = new Project({
			name: 'Exercise',
			description: 'add-exercise',
			tags: ['javascript'],
			group: false,
			group_members: ['dom']
		});
		newProject.save(function(err, data) {
			chai.request(server)
				.get('/api/v1/project/'+ data.id)
				.end(function(err, res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('_id');
					res.body.should.have.property('name');
					res.body.should.have.property('description');
					res.body.should.have.property('tags');
					res.body.should.have.property('group');
					res.body.should.have.property('group_members');
					res.body.name.should.equal('Exercise');
					res.body.description.should.equal('add-exercise');
					res.body.tags.should.deep.equal(['javascript']);
					res.body.tags[0].should.equal('javascript');
					res.body.group.should.equal(false);
					res.body.group_members.should.deep.equal(['dom']);
					res.body.group_members[0].should.equal('dom');
					done();
				});
		});
	});


	it('should add a SINGLE project on /projects POST', function(done) {
		chai.request(server)
			.post('/api/v1/projects')
			.send({
				name: 'Superhero',
				description: 'add-superhero',
				tags: ['angular'],
				group: true,
				group_members: ['billy']
			})
			.end(function(err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.a.property('SUCCESS');
				res.body.SUCCESS.should.be.a('object');
				res.body.SUCCESS.should.have.property('name');
				res.body.SUCCESS.should.have.property('description');
				res.body.SUCCESS.should.have.property('tags');
				res.body.SUCCESS.should.have.property('group');
				res.body.SUCCESS.should.have.property('group_members');
				res.body.SUCCESS.name.should.equal('Superhero');
				res.body.SUCCESS.description.should.equal('add-superhero');
				res.body.SUCCESS.tags.should.deep.equal(['angular']);
				res.body.SUCCESS.tags[0].should.equal('angular');
				res.body.SUCCESS.group.should.equal(true);
				res.body.SUCCESS.group_members.should.deep.equal(['billy']);
				res.body.SUCCESS.group_members[0].should.equal('billy');
				done();
			});
	});


	it('should update a SINGLE project on /project/<id> PUT', function(done) {
    chai.request(server)
      .get('/api/v1/projects')
      .end(function(err, res){
        chai.request(server)
          .put('/api/v1/project/'+ res.body[0]._id)
          .send({'name': 'Speech'})
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('UPDATED');
            res.body.UPDATED.should.be.a('object');
            res.body.UPDATED.should.have.property('name');
            res.body.UPDATED.should.have.property('_id');
            res.body.UPDATED.name.should.equal('Speech');
            done();
        });
      });
  });


	it('should delete a SINGLE project on /project/<id> DELETE', function(done) {
		chai.request(server)
			.get('/api/v1/projects')
			.end(function(err, res) {
				chai.request(server)
					.delete('/api/v1/project/'+ res.body[0]._id)
					.end(function(err, res) {
						res.should.have.status(200);
						res.should.be.json;
						res.body.should.be.a('object');
						res.body.should.have.property('REMOVED');
						res.body.REMOVED.should.be.a('object');
						res.body.REMOVED.should.have.property('name');
						res.body.REMOVED.should.have.property('description');
						res.body.REMOVED.should.have.property('tags');
						res.body.REMOVED.should.have.property('group');
						res.body.REMOVED.should.have.property('group_members');
						res.body.REMOVED.name.should.equal('Translator');
						done();
					});
			});
	});



});