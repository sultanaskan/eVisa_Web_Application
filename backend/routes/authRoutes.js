import express from 'express';
import  { loginUser, registerUser, getUsers} from '../controllers/authController.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/users', getUsers);







export default router;