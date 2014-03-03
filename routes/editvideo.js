var mongoose = require('mongoose');
Video = mongoose.model('Video');
Setlist = mongoose.model('Setlist');


exports.view = function(req, res){
	var videoId = req.params.videoId;
	Video.findOne({'_id': videoId}, function (err, video) {
		res.render('editvideo', video);
	});
}

exports.edit = function(req, res) {
	var videoId = req.params.videoId;
	title = req.body.title;
	description = req.body.description;
    
    var sanitized_title = title.toLowerCase().replace(/[{}()"'*.,#@_]/g, '');
    var sanitized_desc = description.toLowerCase().replace(/[{}()"'*.,#@_]/g, '');
    var keyword = sanitized_title.split(" ").concat(sanitized_desc.split(" "));

	Video.update({'_id':videoId}, {$set: {title: title, description: description, keyword: keyword}}, function (err, video) {
		if (err) console.log(err);
		console.log(videoId);
		res.json({"_id": videoId});
	});

}

exports.deleteconfirm = function(req, res) {
	var videoId = req.params.videoId;
	Video.findOne({'_id': videoId}, function (err, video) {
		res.render('deletevideo', video);
	});
}

exports.delete = function(req, res) {
	var videoId = req.params.videoId;
	Video.remove({'_id': videoId}, function (err, video) {
		if(err) console.log(err);
		res.send();
	});
}