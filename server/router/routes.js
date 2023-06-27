
const express = require('express');


const router = express.Router();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config( { path : '.env'} )
const auth = require("../middleware/auth");

const userController = require('../controller/controller')


router.use(bodyParser.urlencoded({extended:false}))
router.use(express.json());


router.get('/',userController.random);
router.post('/registration', userController.userAdd);
router.post('/login', userController.userLogin);
router.get('/validUser', auth, userController.User);
router.get('/logout', auth, userController.LogOut)
router.post('/passwordLink', userController.PasswordLink);
router.get('/forget-password/:id/:token',userController.forgetpassword)
router.post('/:id/:token', userController.tokenId);



module.exports = router;