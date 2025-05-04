import httpStatus from 'http-status';
import AuthServices from '../services/Auth.service.js';
import asynchandler from '../utils/asynchandler.js';
 
class AuthController {
    static RegisterUser = asynchandler(async(req,res)=>{
        const res_obj = await AuthServices.RegisterUser(req.body);
        res.status(httpStatus.CREATED).send(res_obj)
    }) 
    static loginUser = asynchandler(async(req,res)=>{
        console.log(res)
        const res_obj = await AuthServices.loginUser(req.body);
        res.status(httpStatus.OK).send(res_obj)
    }) 
    static profilelogin = asynchandler(async(req,res)=>{
        const res_obj = await AuthServices.Profileservies(req.user);
        res.status(httpStatus.OK).send(res_obj)
    }) 
}

export default AuthController;
