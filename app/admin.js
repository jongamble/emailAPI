var User	=	require('../app/models/user');
var Lead	=	require('../app/models/lead');

// app/admin.js
module.exports = function(app, mongoose, passport) {

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)


	app.get('/admin', isLoggedIn, isAdmin,function(req, res) {
		User.find().exec(function (err, items) {
			res.render('admin/admin.ejs', {
				items : items // get the user out of session and pass to template
			});
	   	});
	});

	app.get('/admin/listUsers', isLoggedIn, isAdmin, function(req, res){
		User.find().exec(function (err, items) {
			res.json(items);
	   	});
	});

	app.get('/admin/listUsers/:id', isLoggedIn, isAdmin, function(req, res){
		User.find({_id: req.params.id}).exec(function (err, items) {
			res.json(items);
	   	});
	})


	// =====================================
	// Create User =========================
	// =====================================
	// show the create user form
	app.get('/admin/createUser', isLoggedIn, isAdmin, function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('admin/signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/admin/createUser', passport.authenticate('local-signup', {
		successRedirect : '/admin', // redirect to the secure profile section
		failureRedirect : '/admin/createUser', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


	// =====================================
	// Edit User ===========================
	// =====================================
	// show the create user form
	app.get('/admin/editUser/:id', isLoggedIn, isAdmin, function(req, res) {
		User.find({_id: req.params.id}).exec(function (err, user) {
				res.render('admin/editUser.ejs', { user : user });
		});
	});

	// process the edit user form
	app.post('/admin/editUser/:id', isLoggedIn, isAdmin, function(req, res) {
		
		User.findById(req.params.id, function(err, user) {
			if (err) return next(err);
			user.domain = req.body.domain;
			user.name = req.body.name;
			user.email = req.body.email; 
			user.flagAdmin = req.body.flagAdmin;
			user.flagActive = req.body.flagActive;
			console.log(user);
			user.save(function(err){
			    if (err) console.log(err);
			    res.redirect('/admin');
			});
		});
	});

	/*
	 * DELETE to deleteuser.
	*/

	app.delete('/admin/deleteuser/:id', isLoggedIn, isAdmin,function(req, res) {
		User.remove({_id: req.params.id}, function(err, result) {
			User.find().exec(function (err, items) {
				res.json((result === 1) ? items : { msg:'error: ' + err });
		   	});
		});
	});



	/******
	* Create Lead
	******/

	// process the edit user form
	app.post('/admin/createLead', isLoggedIn, isAdmin, function(req, res) {
		var lead = new Lead();
			
		lead.clientID = req.body.clientID;
		lead.content = { 
			leadname :req.body.leadName,
			leadEmail : req.body.leadEmail,
			leadAddress : req.body.leadAddress,
			leadComments : req.body.leadComments
		}

		lead.save(function(err){
			if (err) console.log(err);
			res.redirect('/admin');
		});
	});



	// =====================================
	// View Leads by User ===========================
	// =====================================
	
	app.get('/admin/listLeads/:id', isLoggedIn, isAdmin, function(req, res) {
		Lead.find({clientID: req.params.id}).exec(function (err, leads) {
				res.render('admin/listLeads.ejs', { leads : leads });
		});
		// render the page and pass in any flash data if it exists
	});

	// =====================================
	// View Leads by ID ===========================
	// =====================================
	
	app.get('/admin/viewLeadContent/:id', isLoggedIn, isAdmin, function(req, res) {
		Lead.findOne({_id: req.params.id}).exec(function (err, lead) {
				res.render('admin/viewLeadContent.ejs', {lead : lead} );
		});
		// render the page and pass in any flash data if it exists
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