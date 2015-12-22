var mongoose = require('mongoose');

var publication = new mongoose.Schema({
    title: String,
    text: String
});


var Publication = mongoose.model('Publication', publication);