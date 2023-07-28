const express = require ('express')
const router = express.Router();
const { authenticateUser, checkIfStaff, checkIfAdmin, checkIfManager, checkIfRegUser} = require ('../middleware/auth');

const controller =  require('../controllers/passwordRecoveryController');

router.put('/forgotpassword', controller.passwordRecovery);
router.put('/changePassword', authenticateUser, controller.changePassword);

module.exports = router;