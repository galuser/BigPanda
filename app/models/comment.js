var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentSchema   = new Schema({
    username: String,
    message: String,
    img: String
});

module.exports = mongoose.model('Comment', CommentSchema);
