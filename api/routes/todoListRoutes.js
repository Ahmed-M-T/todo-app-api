'use strict';
var express = require('express');
var router =express.Router();
var jwt = require('jsonwebtoken');

var todoList_controller = require('../controllers/todoListController');
// router.get('/',todoList_controller.list)
// get list of user by user id 
router.post('/create',todoList_controller.create_a_list);

// read list by user id
router.get('/',checkAuthenticated,todoList_controller.list_all_tasks);
// update list
router.put('/update',checkAuthenticated,todoList_controller.update_a_list);
// delete list
router.delete('/:userId/delete',todoList_controller.delete_a_list);

module.exports = router;
//helper functions
function checkAuthenticated(req,res,next){
    console.log('welecomeddddddddddddddddddd')
    if(!req.header('authorization'))
       return res.status(401).send({message: 'Unauthorized requested .Missing authentication header'});
    var token =req.header('authorization').split(' ')[1];
    var payload =jwt.decode(token,'12345');
    if(!payload)
        return res.status(401).send({message: 'Unauthorized requested .Missing authentication header'});
   req.user_token = payload;
   next();
   }