var User	=	require('../app/models/user');
var Lead	=	require('../app/models/lead');

// app/admin.js
module.exports = function(app, mongoose, passport) {

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

	/******
	* Create Lead
	******/

	// process the edit user form
	app.post('/profile/createLead', isLoggedIn, function(req, res) {
		var lead = new Lead();
			
		lead.clientID = req.user._id;
		lead.content = { 
			leadname :req.body.leadName,
			leadEmail : req.body.leadEmail,
			leadAddress : req.body.leadAddress,
			leadComments : req.body.leadComments
		}

		lead.save(function(err){
			if (err) console.log(err);
			res.redirect('/profile');
		});
	});



	// =====================================
	// View Leads by User ===========================
	// =====================================
	
	app.get('/profile/listLeads', isLoggedIn, function(req, res) {
		Lead.find({clientID: req.user._id}).exec(function (err, leads) {
				res.render('profile/listLeads.ejs', { leads : leads });
		});
		// render the page and pass in any flash data if it exists
	});

	// =====================================
	// View Leads by ID ===========================
	// =====================================
	
	app.get('/profile/viewLeadContent/:id', isLoggedIn, function(req, res) {
		Lead.findOne({_id: req.user._id}).exec(function (err, lead) {
				res.render('profile/viewLeadContent.ejs', {lead : lead} );
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
};

var isAdmin = function(req, res, next) {
	if (req.user && req.user.flagAdmin === true)
		return next();
	
	// if they aren't redirect them to the home page
	console.log('Not an Admin');
	res.redirect('/profile');
};