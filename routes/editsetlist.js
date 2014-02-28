var mongoose = require('mongoose');
Video = mongoose.model('Video');
Setlist = mongoose.model('Setlist');


exports.view = function(req, res){
	var setlistId = req.params.setlistId;
	Setlist.findOne({'_id': setlistId}, function (err, setlist) {
		res.render('editsetlist', setlist);
	});
}

exports.edit = function(req, res) {
	var setlistId = req.params.setlistId;
	title = req.body.title;
	description = req.body.description;

	Setlist.update({'_id':setlistId}, {$set: {title: title, description: description}}, function (err, setlist) {
		if (err) console.log(err);
		res.json({"_id": setlistId});
	});

}
