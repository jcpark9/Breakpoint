var mongoose = require('mongoose');
Video = mongoose.model('Video');
Setlist = mongoose.model('Setlist');


exports.view = function(req, res){
	res.render('createsetlist');
}

exports.create = function(req, res) {
	Setlist.create(req.body, function(err, setlist) {
		console.log(req.body);
		console.log(setlist);
		if (err) console.log(err);
		res.json(setlist);
	});
}
