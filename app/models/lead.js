// app/models/lead.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var leadSchema = mongoose.Schema({
	clientID: mongoose.Schema.Types.ObjectId,
	content: mongoose.Schema.Types.Mixed,
	flagUnread:{ type: Boolean, default: true},
	flagArchive: { type: Boolean, default: false},
	flagMobile: { type: Boolean, default: false},
	leadDate: { type: Date, default: Date.now },
	leadQuality: Number
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Lead', leadSchema);