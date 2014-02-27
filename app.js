
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var http = require('http');
var path = require('path');

var ObjectID = require('mongodb').ObjectID;
var objectId = new ObjectID();

// Database
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost/trmk_emails', {safe:true, native_parser:true});



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({secret: 'keyboard cat'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));





// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index(db, ObjectID));
app.get('/userlist', user.userlist(db, ObjectID));
app.get('/listEmails', user.listEmails(db));
app.get('/userEmails/:memberID', user.userEmails(db, ObjectID));
app.post('/adduser', user.adduser(db));
app.post('/addEmail', user.addEmail(db));
app.del('/deleteuser/:id', user.deleteuser(db, ObjectID));
app.del('/deleteEmail/:id', user.deleteEmail(db, ObjectID));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});