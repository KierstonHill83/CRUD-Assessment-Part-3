var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
	name: String,
	description: String,
	tags: [String],
	group: Boolean,
	group_members: [String]
});

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/node-project');

module.exports = mongoose.model('projects', Project);