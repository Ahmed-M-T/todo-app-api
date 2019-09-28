var express = require('express');
var router =express.Router();
var UserController =require('../controllers/userController');

router.post('/signup',UserController.Create_User);
router.post('/login',UserController.Get_User_Id_Login);

module.exports = router;