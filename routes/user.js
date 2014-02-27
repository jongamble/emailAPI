/*
 * GET userlist page.
 */

exports.userlist = function(db, ObjectID) {
  return function(req, res) {
    db.collection('userlist').find().toArray(function (err, items) {
      
	    
	  
	  res.json(items);
	  //console.log(emailCount);
      
    });
  }
};

exports.listEmails = function(db) {
  return function(req, res) {
    db.collection('userEmails').find().toArray(function (err, emails) {
      res.render('userEmails', {
		title: 'User Emails', 
		copy: 'Here are all of the emails in the DB',
		emails: emails
	  });
    })
  }
};
/*
 * GET userEmails list page.
 */
exports.userEmails = function(db, ObjectID) {
	return function(req, res) {
		console.log(req.params.memberID);
		db.collection('userEmails').find({memberID: req.params.memberID}).toArray(function(err, emails) {
			res.render('userEmails', {
				title: 'User Emails',
				copy: 'Here are all of the emails in the DB for this particular user.',
				emails: emails 
			});
			
		})
		
	}
};

/*
 * POST to adduser.
 */

exports.adduser = function(db) {
  return function(req, res) {
    db.collection('userlist').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};


/*
 * POST to adduser.
 */

exports.addEmail = function(db, ObjectID) {
  return function(req, res) {
    db.collection('userEmails').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};


/*
 * DELETE to deleteuser.
 */

exports.deleteuser = function(db, ObjectID) {
  return function(req, res) {
    db.collection('userlist').remove({_id: ObjectID.createFromHexString(req.params.id)}, function(err, result) {
      res.json((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
  }
};

/*
 * DELETE to deleteuser.
 */
exports.deleteEmail = function(db, ObjectID) {
  return function(req, res) {
    db.collection('userEmails').remove({_id: ObjectID.createFromHexString(req.params.id)}, function(err, result) {
      res.json((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
  }
};
