var mongoose = require('mongoose');
Video = mongoose.model('Video');
Setlist = mongoose.model('Setlist');


exports.view = function(req, res){
	var data = {};
	var videoId = req.params.videoId;

	var	options = {
		sort: {'title': 1}
	}
	Video.findOne({'_id':videoId}, function (err, video) {
		data.video = video;

		Setlist.find({}, {}, options, function (err, setlists) {
			var i = 0;
			while (true) {
				if (i == setlists.length) break;
				var setlist = setlists[i];
				if (setlist.setlistvids.indexOf(videoId) != -1) {
					setlists.splice(i,1);
				} else {
					i += 1;
				}
			}

			data.setlists = setlists;
			data.noVideo = false;
			if (setlists.length == 0) {
				data.noVideo = true;
			}
			res.render('vidtosetlist', data);
		});
	});
}

exports.add = function(req, res){
	var setlistId = req.body.setlistId;
	var data = {};

	Setlist.findOne({'_id':setlistId}, function (err, setlist) {
		setlist.setlistvids.push(req.params.videoId);

		Setlist.update({'_id':setlistId}, {$set: {'setlistvids': setlist.setlistvids}}, function (err, setlist) {
			if (err) console.log(err);
			data["setlistId"] = setlistId;
			res.json(data);
		});
	});
}