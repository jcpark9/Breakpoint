var mongoose = require('mongoose');
var Setlist = new mongoose.Schema({
	  title: String
	, description: String
	, setlistvids: [String]
});

module.exports.Setlist = Setlist;

exports.Setlist = mongoose.model('Setlist', Setlist);