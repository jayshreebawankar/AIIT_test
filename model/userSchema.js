const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const User = new Schema({
    name:{type:String, require:true},
    email:{type:String, require:true},
    mobile:{type:Number, require:true},
    dob:{type: Date, require:true}
}) 
const user = mongoose.model('userDB', User)
module.exports = user;
