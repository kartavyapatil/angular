import { Router } from 'express';
import authRoutes from './Auth.service.js';
import employeeRoutes from './employee.service.js';
const router = Router();

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },{
    path: '/employee',
    route: employeeRoutes,
  }
 
];

routes.forEach((cur) => {
  router.use(cur.path, cur.route);
});

export default router;
