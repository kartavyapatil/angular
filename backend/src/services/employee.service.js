import httpStatus from 'http-status';
import { employeemodel } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

class employeeService {
  static async createEmployee(user, body) {
    const { name, experience, dateofbirth, role } = body;

    await employeemodel.create({
      name,
      experience,
      dateofbirth,
      role,
     user
    });

    return {
      msg: "Employee added :)"
    };
  }

  static async deleteEmployee(user, id) {
    const checkExist = await employeemodel.findOneAndDelete({ user: user, _id: id });
    if (!checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Employee not in record");
    }

    return {
      msg: "Employee deleted :("
    };
  }

  static async  getAllEmployees(user) {
    const data = await employeemodel.find({user}).select("name role experience dateofbirth")


    return {
      employees: data,
    };
  }

  static async getEmployeeForSearch(user) {
    const data = await employeemodel.find({ user }).select("name role");
    return {
      employees: data,
    };
  }

  static async getById(user, id) {
    const checkExist = await employeemodel.findOne({ user: user, _id: id });
    if (!checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Employee not in record");
    }
    return {
      employee: checkExist
    };
  }

  static async updateEmployee(user, id, body) {
    // console.log(body);
    console.log("the data comming from employee service ",id);
    
    const { name, experience, dateofbirth, role } = body;

    const checkExist = await employeemodel.findById({_id: id});
    if (!checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Employee not found");
    }
    await employeemodel.findByIdAndUpdate(id, {
      name,
      experience,
      dateofbirth,
      role,
      user
    });

    return {
      msg: "Employee updated :)"
    };
  }
}

export default employeeService;
