const express = require ('express')
const router = express.Router();
const { authenticateUser, checkIfManager, checkIfRegUser} = require ('../middleware/auth');
const cookieParser = require("cookie-parser")
router.use(cookieParser());

const controller =  require('../controllers/BookController');

router.post('/create', authenticateUser, checkIfManager, controller.createBook);
router.get('/allbooks', authenticateUser, checkIfManager, controller.getAllBooks );
router.get('/all', controller.getAvailableBooks );
router.get('/:id', controller.getBookById );
router.get('/category', authenticateUser, controller.getBooksByCategory );
router.put('/update', authenticateUser, checkIfManager, controller.DoUpdateBook );
router.delete('/delete', authenticateUser, checkIfManager, controller.DoDeleteBook );

module.exports = router;  