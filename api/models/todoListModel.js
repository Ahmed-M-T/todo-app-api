'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ListofTodoSchema = new Schema({
    userId:Schema.Types.ObjectId,
    list:[{
     
  title: {
    type: String,
    required: true
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  complete:{
    type:Boolean,
    default:false
  }
  
}]});

module.exports = mongoose.model('ListofTodo', ListofTodoSchema,'todolists');