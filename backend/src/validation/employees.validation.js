import {body, param} from 'express-validator';
class EmployeesValidation {
    static createEmployee=
         [
        body('name').notEmpty().withMessage('Name is required'),
        body('experience').notEmpty().withMessage('experience is required'),
        body('dateofbirth').isDate().withMessage('date is required'),
        body('role').notEmpty().withMessage('role is required')
        ];
    }
export default EmployeesValidation;    