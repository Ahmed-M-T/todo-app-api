'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
      },
      password: {
        type: 'String',
        required: true,
        trim: true
      }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.Create_user = function(user,callback){
    var new_user = new User(user);
    new_user.save((err,result)=>{
        return callback(err,result);
    });
};
module.exports.Get_User_by_name = function(name,callback){
    User.find({name:name},(err,result)=>{
      return callback(err,result);
    });
}