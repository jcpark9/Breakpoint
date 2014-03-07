
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var sass = require('node-sass');

var mongoose = require("mongoose");
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/test';
mongoose.connect(uristring);

mongoose.model('Video', require('./models/video').Video, "videos");
mongoose.model('Setlist', require('./models/setlist').Setlist, "setlists");
Video = mongoose.model('Video');
Setlist = mongoose.model('Setlist');

/* Remove content */
mongoose.connection.collections['videos'].drop();
mongoose.connection.collections['setlists'].drop();

/* Repopulate with seed */
var videoseed = require('./videoseed.json');
var setlistseed = require('./setlistseed.json');
Video.create(videoseed, function (err) {
    if (err) {
    	console.log(err);
    }
});
Setlist.create(setlistseed, function (err) {
    if (err) {
    	console.log(err);
    }
});

var index = require('./routes/index');
var video = require('./routes/video');
var sandbox = require('./routes/sandbox');
var playlist = require('./routes/playlist');
var help = require('./routes/help');
var create = require('./routes/create');
var setlist = require('./routes/setlist');
var createsetlist = require('./routes/createsetlist');
var addtosetlist = require('./routes/addtosetlist');
var editsetlist = require('./routes/editsetlist');
var editvideo = require('./routes/editvideo');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', handlebars({'defaultLayout':'main'}));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(
    sass.middleware({
         src: __dirname + '/public', //where the sass files are 
         dest: __dirname + '/public', //where css should go
         debug: true // obvious
    })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/video', video.watchVideo);
app.get('/video/?ytid=:ytID', video.watchVideo);
app.get('/video/:id', video.watchVideo);
app.post('/video/update/:id', video.updateBreakpoints);

app.get('/sandbox', sandbox.view);
app.get('/sandbox/:videoId', sandbox.view);

app.get('/setlist/:setlistId', setlist.view);
app.get('/setlist/:setlistId/remove/:videoId', setlist.remove);
app.get('/setlist/:setlistId/delete', setlist.delete);

app.get('/playlist', playlist.view);
app.post('/playlist', playlist.search);

app.get('/help', help.view);
app.post('/create', create.add);
app.get('/create', create.view);

app.get('/createsetlist', createsetlist.view);
app.post('/createsetlist', createsetlist.create);

app.get('/editsetlist/:setlistId', editsetlist.view);
app.post('/editsetlist/:setlistId', editsetlist.edit);

app.get('/editvideo/:videoId', editvideo.view);
app.post('/editvideo/:videoId', editvideo.edit);
app.get('/editvideo/deleteconfirm/:videoId', editvideo.deleteconfirm);
app.get('/editvideo/delete/:videoId', editvideo.delete);


app.get('/addtosetlist/:setlistId', addtosetlist.view);
app.post('/addtosetlist/:setlistId', addtosetlist.add);
app.post('/addtosetlist/:setlistId/search', addtosetlist.search);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
