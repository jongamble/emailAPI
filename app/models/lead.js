// app/models/lead.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var leadSchema = mongoose.Schema({
	clientID: Schema.ObjectID,
	content: Schema.Mixed,
	flagUnread: Boolean,
	flagArchive: Boolean,
	flagMobile: Boolean,
	leadDate: { type: Date, default: Date.now },
	leadQuality: Number
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Lead', leadSchema);