const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require('./user.model');
db.avatar = require('./avatar.model');

module.exports = db;