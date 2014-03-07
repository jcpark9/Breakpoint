var mongoose = require('mongoose');
Video = mongoose.model('Video');
Setlist = mongoose.model('Setlist');

exports.view = function(req, res){
	var data = {};

	data["helpers"] = {
	    title_of: function(id) {
	    	for (var i=0; i < data.videos.length; i++) {
	    		var elem = data.videos[i];
	    		if (elem._id == id) {
	    			return elem.title;
	    		}
	    	}
	  	},
	  	thumbnail_of: function(id) {
	  		if (id == undefined) {
	  			return "/images/placeholder.jpg";
	  		}
	  		for (var i=0; i < data.videos.length; i++) {
	    		var elem = data.videos[i];
	    		if (elem._id == id) {
	    			return elem.imageURL;
	    		}
	    	}
	  	}
	};

	Setlist.find({}, function (err, setlists) {
		data.setlists = setlists;
		console.log(data.setlists);

		Video.find({}, function (err, videos) {
			data.videos = videos;
		
			var options = {
			    "limit": 12,
			    "sort": {"lastWatched": -1}
			}
			Video.find({}, {}, options, function (err, videos) {
				data.recentlyWatched = videos;
				options = {
				    "limit": 12,
				    "sort": {"created": -1}
				}
				Video.find({}, {}, options, function (err, videos) {
					data.recentlyCreated = videos;
					res.render('playlist', data);
				});
			});
		});
	});
}


exports.search = function(req, res){
	Video.find( { keyword: { $in: req.body.query.toLowerCase().split(" ") } }, function (err, videos) {
		if (err) console.log(err);
		res.json(videos);
	});
}