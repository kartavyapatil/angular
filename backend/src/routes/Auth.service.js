import { Router } from 'express';
import AuthValidation from '../validation/Auth.validation.js';
import validation from '../middlewares/validation.js'
import AuthController from '../controllers/Auth.controller.js';
import Authentication from '../middlewares/Authentication.js';


// console.log('AuthValidation:', AuthValidation);
// console.log('validation:', validation);
// console.log('AuthController:', AuthController);
const router = Router();
router.post('/register', AuthValidation.RegisterUser, validation, AuthController.RegisterUser);
router.post('/login', AuthValidation.loginUser, validation, AuthController.loginUser);
router.get('/profile', Authentication, AuthController.profilelogin);

export default router;
