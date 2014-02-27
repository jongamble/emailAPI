
/*
 * GET home page.
 */

exports.index = function(db, ObjectID) {
	return function(req, res) {
		db.collection('userlist').find().toArray(function (err, items) {
			res.render('index', { title: 'Trimark', copy: 'View our Users and their Emails', items:items });
		});
	}
};

exports.helloworld = function(req, res){
  res.render('hellowworld', { title: 'Hello,', copy: 'World!' });
};