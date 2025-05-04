import asynchandler from "../../src/utils/asynchandler.js";
import employeeService from "../services/employee.service.js";
import httpStatus from "http-status";

class employeecontroller{
    static createEmployee = asynchandler(async(req,res)=>{
       
        const res_obj = await employeeService.createEmployee(req?.user,req.body);
        res.status(httpStatus.CREATED).send(res_obj)
    })
    static deleteEmployee = asynchandler(async(req,res)=>{
        const res_obj = await employeeService.deleteEmployee(req?.user,req.params.id);
        res.status(httpStatus.OK).send(res_obj)
    })
    static getAllEmployees = asynchandler(async(req,res)=>{
        const res_obj = await employeeService.getAllEmployees(req?.user);
        res.status(httpStatus.OK).send(res_obj)
    })
    static getById = asynchandler(async(req,res)=>{
        const res_obj = await employeeService.getById(req?.user,req.params.id);
        res.status(httpStatus.OK).send(res_obj)
    })
    static updateEmployee = asynchandler(async(req,res)=>{
        console.log("the request is ",req)
        const res_obj = await employeeService.updateEmployee(req?.user,req?.params.id,req.body);
        res.status(httpStatus.OK).send(res_obj)
        console.log("the request body",req.body)
        console.log("the request params",req.params.id)
    })
}
export default employeecontroller;