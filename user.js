var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    email:String,
    password: String,
    name: String,
    mob: Number,
    flat: Number,
    ownername: String
})