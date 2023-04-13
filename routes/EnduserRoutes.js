const express = require ('express');
const router = express.Router();
const { authenticateUser, checkIfStaff, checkIfAdmin, checkIfManager, checkIfRegUser } = require ('../middleware/auth');
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const controller =  require('../controllers/EnduserController');

router.post('/register', controller.register);
router.post('/signin', controller.signin);
router.get('/signin', authenticateUser,  checkIfManager, controller.getLoggedInUser);
router.get('/signout', authenticateUser, controller.signout);

module.exports = router;