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
		User.find().toArray(function (err, items) {
			res.render('admin.ejs', {
				items : userList // get the user out of session and pass to template
			});
	   	});
	});


};