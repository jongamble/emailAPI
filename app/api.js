var User	=	require('../app/models/user');
var Lead	=	require('../app/models/lead');

// app/admin.js
module.exports = function(app, mongoose, passport) {

	// process the edit user form
	app.post('/api/newLead/:id', function(req, res) {
		if(User.find({_id: req.params.id})){
			var lead = new Lead();
				
			lead.clientID = req.params.id;
			lead.content = req.body;

			lead.save(function(err){
				if (err) console.log(err);
				res.redirect('/profile');
			});
		}
	});
};