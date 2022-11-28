const express = require ('express')
const router = express.Router();
const { authenticateUser, checkIfStaff, checkIfAdmin, checkIfManager, checkIfRegUser} = require ('../middleware/auth');

const controller =  require('../Controllers/EnduserController');

router.post('/register', controller.register);
router.post('/signin', controller.signin);
router.get('/signin', authenticateUser, checkIfRegUser, controller.getLoggedInUser);
router.get('/signout', authenticateUser, controller.signout);

module.exports = router;