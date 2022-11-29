const express = require ('express')
const router = express.Router();
const { authenticateUser, checkIfStaff, checkIfAdmin, checkIfManager, checkIfRegUser} = require ('../middleware/auth');
const cookieParser = require("cookie-parser")
router.use(cookieParser());

const controller =  require('../Controllers/BookController');


module.exports = router;