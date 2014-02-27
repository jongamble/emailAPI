exports.form = function(req, res) {
		res.render('login', { title: 'Login', copy: 'Please enter your log in credentials below.' });
};

exports.authenticate = function(passport) {
	return function(req, res) {
		
	}
};