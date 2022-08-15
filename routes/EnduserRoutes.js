const express = require ('express')
const router = express.Router();

const controller =  require('../Controllers/EnduserController');


router.get('/api/auth/login', controller.show)
router.post('/api/auth/login', controller.loginUsers);


module.exports = router;