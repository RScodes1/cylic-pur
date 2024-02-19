const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {type:String, required:true},
    email : {type:String, required: true},
    password : {type:String, required: true},
    city: {type: String},
    age: {type: String},
    gender: { type: String, enum: ['male', 'female', 'other'] }
}, {
    versionKey : false
})

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}