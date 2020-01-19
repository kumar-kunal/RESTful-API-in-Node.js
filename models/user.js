const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, unique:true},
    password: String,
    place: String,
    latitude: {type:Number},
    longitude: {type:Number}
});


module.exports = mongoose.model('User',userSchema);