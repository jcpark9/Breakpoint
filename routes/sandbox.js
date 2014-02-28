// charlie's sandbox


exports.view = function(req, res){
    var videoId = req.params.videoId; 
    res.render('video_show',
    // res.render('charlie_sandbox',
        {
            'layout':'angular_layout',
            'cssFiles': [
                {filename: 'video_show.css'},
                {filename:'font-awesome.min.css'}
            ],
            'videoId': videoId
        });

};

