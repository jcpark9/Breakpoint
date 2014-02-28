var mongoose = require('mongoose');

var Video = new mongoose.Schema({
	  title: String
	, description: String
	, duration: String
	, lastWatched: Date
	, created: Date
	, keyword: [ String ]
	, youtubeid: String
	, imageURL: String
	, breakpoints: [{ name: String, start: String, end: String, pid: String, speed: Number, repeat: Boolean }]
});

Video.index( { keyword: 1 } );

module.exports.Video = Video;

exports.Video = mongoose.model('Video', Video);