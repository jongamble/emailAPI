// app/models/lead.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var leadSchema = mongoose.Schema({
	clientID: Schema.Types.ObjectID,
	content: Schema.Types.Mixed,
	flagUnread: Boolean,
	flagArchive: Boolean,
	flagMobile: Boolean,
	leadDate: Date,
	leadQuality: Number
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Lead', leadSchema);