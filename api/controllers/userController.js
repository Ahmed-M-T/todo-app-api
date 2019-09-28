'use strict';
var User = require('../models/userModel');
var ListofTodo = require('../models/todoListModel');

var jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;
exports.Create_User = function(req,res){
    // check name unique
   CheckNameUnique(req, (err,result)=>{
           if (err)
            res.send(err);
           if (result.length > 0)
             res.json({ message: "User name not unique", completed: false });
           // create user
           User.Create_user({name:req.body.name,password:req.body.password},(err,result)=>{
            if(err)
            res.send(err);
            // create inital list
            var newlist = new ListofTodo({userId:result._id,list:[]});
                newlist.save((err,result)=>{
                    if(err)
                    res.send(err);
                    console.log(newlist);
                    //send token
                    sendToken(result,res);
                });
           
                
        });           


   });
        
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    //     if(err)
    //     res.send(err);
    //     var user = UserController.Create_user({name:req.body.name,password:hash});
    //     sendToken(user,res);
    //   });
  
};
exports.Get_User_Id_Login = function(req,res){
    //get user
    User.Get_User_by_name(req.body.name,(err,result)=>{
        console.log(err);
        console.log('555'+result);
        if(err)
            res.send(err);
        if(result[0] === undefined )
        res.json({message:"Name is incorrect",err:'name',completed:false})       
        // check password
        else if(req.body.password === result[0].password)
            sendToken(result[0],res);
        else
            res.json({message:"Password is incorrect",err:'password',completed:false}); 

    });
    // var user = UserController.Get_User_by_name(req.body.name);
    // if(req.body.password === user.password)
    //   sendToken(user.toJSON(),res);
    //     res.json({message:"Password is incorrect",completed:false}); 
    
    // bcrypt.compare(req.body.password, user.password, function(err, result) {
    //     if(err)
    //     res.send(err);
    //     if(result)
    //     sendToken(user,res);
    //     res.json({message:"Password is incorrect",completed:false});
    // });

}


//helper function
//send token
function sendToken(user,res){
    var token =jwt.sign(user.toJSON(),'12345');
    res.json(
       // {'token':token,'name':user.name,'userId':user._id,completed:true},
        {'token':token,'name':user.name,completed:true});
 }
 //CheckNameUnique
 function CheckNameUnique(req,callback) {
    User.find({ name: req.body.name }, (err, result) => {
        return callback(err,result);

    });
}
