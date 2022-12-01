const express = require ('express')
const router = express.Router();
const { authenticateUser, checkIfManager, checkIfRegUser} = require ('../middleware/auth');
const cookieParser = require("cookie-parser")
router.use(cookieParser());

const controller =  require('../Controllers/BookController');

router.post('/create', authenticateUser, checkIfManager, controller.createBook);
router.get('/all', authenticateUser, controller.getAllBooks );
router.get('/category', authenticateUser, controller.getBooksByCategory );
router.put('/update', authenticateUser, checkIfManager, controller.DoUpdateBook );
router.delete('/delete', authenticateUser, checkIfManager, controller.DoDeleteBook );

module.exports = router;