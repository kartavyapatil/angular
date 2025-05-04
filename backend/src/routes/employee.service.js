import {Router} from 'express';
import EmployeesController from '../controllers/employees.controller.js';
import EmployeesValidation from '../validation/employees.validation.js';
import validation from '../middlewares/validation.js';
import Authentication from '../middlewares/Authentication.js';

const router = Router();
router.use(Authentication)
router.post('/create', EmployeesValidation.createEmployee, validation, EmployeesController.createEmployee);
router.delete('/delete/:id', EmployeesController.deleteEmployee);
router.get('/getall', EmployeesController.getAllEmployees);
router.get('/get/:id', EmployeesController.getById);
router.put('/update/:id', EmployeesController.updateEmployee);

export default router;