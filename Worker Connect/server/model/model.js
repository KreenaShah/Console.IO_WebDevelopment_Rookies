const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname: { type: String, required:true },
    lname: { type: String, required:true},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    access_lvl:{
        type: String
    },
    isVerified:{
        type:String,
        default:false
    },
});

const ResetPwEmails=new Schema({
    email:{type:String,required:true}
})


const UserModel = mongoose.model('user', UserSchema);
const ResetPwEmailModel=mongoose.model('resetEmail',ResetPwEmails);

module.exports = {UserModel,ResetPwEmailModel};