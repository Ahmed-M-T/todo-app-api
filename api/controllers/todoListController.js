'use strict';
var ListofTodo = require('../models/todoListModel');
 
exports.list_all_tasks = function(req, res) {
  //user_token._id
    ListofTodo.findOne({userId:req.user_token._id},(err,result)=>{
        if(err)
        res.send(err);
        res.json(result.list);
    });
};


exports.create_a_list = function(req, res) {
    var newlist =new ListofTodo(req.body);
    newlist.save((err,result)=>{
        if(err)
        res.send(err);
        res.json(result.list);
    });
};

exports.update_a_list = function(req, res) {
   // ListofTodo.findOneAndUpdate()
    ListofTodo.findOneAndUpdate({userId:req.user_token._id},{$set:{list : req.body.list}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    res.json(doc.list);
    
});
}
exports.delete_a_list = function(req, res) {
    ListofTodo.remove({
        userid:req.params.userId
  }, function(err, result) {
    if (err)
      res.send(err);
    res.json({ message: 'List successfully deleted' });
  });
};


