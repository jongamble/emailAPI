var User	=	require('../app/models/user');
// app/admin.js
module.exports = function(app) {

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/admin', isLoggedIn, isAdmin,function(req, res) {
		User.find().exec(function (err, items) {
			res.render('admin.ejs', {
				items : items // get the user out of session and pass to template
			});
	   	});
	});

	app.get('/admin/listUsers', isLoggedIn, isAdmin, function(req, res){
		User.find().exec(function (err, items) {
			res.json(items);
	   	});
	})


	/*
	 * DELETE to deleteuser.
	*/

	app.delete('/admin/deleteuser/:id', isLoggedIn, isAdmin,function(req, res) {
		User.remove({_id: req.params.id}, function(err, result) {
			User.find().exec(function (err, items) {
				res.json((result === 1) ? { items : items } : { msg:'error: ' + err });
				
		   	});
		});
	});


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	console.log('Not Authenticated');
	res.redirect('/');
}

var isAdmin = function(req, res, next) {
	if (req.user && req.user.flagAdmin === true)
		return next();
	
	// if they aren't redirect them to the home page
	console.log('Not an Admin');
	res.redirect('/profile');
};