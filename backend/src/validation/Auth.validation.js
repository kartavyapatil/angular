import { body } from 'express-validator';

class AuthValidation {
    static RegisterUser = [
        body('name').notEmpty().withMessage('name cannot be empty'),
        body('email').isEmail().withMessage('email must be valid').notEmpty().withMessage('email cannot be empty'),
        body('password').isLength({ min: 6 }).withMessage('password must include a minimum of 6 characters').notEmpty().withMessage('password is required')
    ];
    static loginUser = [
        body('email').isEmail().withMessage('email must be valid').notEmpty().withMessage('email cannot be empty'),
        body('password').isLength({ min: 6 }).withMessage('password must include a minimum of 6 characters').notEmpty().withMessage('password is required')
    ];
    
}

export default AuthValidation;
