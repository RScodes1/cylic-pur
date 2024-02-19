const mongoose = require('mongoose');

const picSchema = new mongoose.Schema({
    qoute : {type:String, required:true},
    photo : {type:String, unique: true, required: true},
    device : {type:String},
    commentsCount: {type: Number},
    userID: {type: String},
    createdBy : {type: String}
}, {
    versionKey : false
})

const PicModel = mongoose.model("pics", picSchema);

module.exports = {
    PicModel
}