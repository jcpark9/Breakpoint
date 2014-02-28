var model = require('../models/video');
var mongoose = require('mongoose');
Video = mongoose.model('Video');

exports.view = function(req, res){
    res.render('create');
};

exports.viewalt = function(req, res){
    res.render('create2');
};

exports.add = function(req, res) {
     var video = req.body.id.videoId;
     var title = req.body.snippet.title;
     var desc = req.body.snippet.description;
     var thumbnail = req.body.snippet.thumbnails.high.url;

     var sanitized_title = title.toLowerCase().replace(/[{}()"'*.,#@_]/g, '');
     var sanitized_desc = desc.toLowerCase().replace(/[{}()"'*.,#@_]/g, '');
     var keyword = sanitized_title.split(" ").concat(sanitized_desc.split(" "));
     console.log(req.body);
     Video.create ({description: desc, title: title, youtubeid: video, imageURL: thumbnail, created: Date.now(), keyword: keyword}, function (err, Video) {
     	if(err) console.log(err);
     	console.log(Video);
     	res.json(Video._id);
     });
};