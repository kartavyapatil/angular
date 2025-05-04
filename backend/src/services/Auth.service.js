// import httpStatus from 'http-status';
// import { profilemodel, usermodel } from '../models/index.js';
// import ApiError from '../utils/ApiError.js';

// class AuthServices {
//     static async RegisterUser(body) {
//         const { email, password, name } = body;
        
//         const checkExist = await usermodel.findOne({ email });
//         if (checkExist) {  // Fixing logic: It should throw if the user already exists
//             throw new ApiError(httpStatus.BAD_REQUEST, "User is already registered");
//         }

//         const user = await usermodel.create({
//             email,
//             password,
//             name
//         });

//         await profilemodel.create({
//             user: user._id
//         });

//         return {
//             msg: "User registered successfully",
//             token: ""
//         };
//     }
// }

// export default AuthServices;

import httpStatus from 'http-status';
import { profilemodel, usermodel } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import { generatoken } from '../utils/Token.utils.js';

class AuthServices {
    static async RegisterUser(body) {
        const { email, password, name } = body;
        
        const checkExist = await usermodel.findOne({ email });
        if (checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User is already registered");
            return
        }

        const user = await usermodel.create({
            email,
            password,
            name
        })
        const token=generatoken(user)
        const refresh_token=generatoken(user,"2d")

        await profilemodel.create({
            user: user._id,
            refresh_token
        });

        return {
            msg: "User registered successfully",
            token: token // Add logic for generating a token if needed
        };
    }
    static async loginUser(body) {
        const { email, password, name } = body;
        console.log(body)
        const checkExist = await usermodel.findOne({ email });
        if (!checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "user not register");
            return
        }
        if(password !==checkExist.password){
            throw new ApiError(httpStatus.BAD_REQUEST,"invalid password")
            return
        }

        const token=generatoken(checkExist)
        return {
            msg: "User login successfully",
            token: token // Add logic for generating a token if needed
        };
    }
    static async Profileservies(user) {
        
        const checkExist = await usermodel.findById(user).select("name email");
        if (!checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "user not register");
            return
        }
        return {
            msg: "data",
            user: checkExist // Add logic for generating a token if needed
        };
    }
}

export default AuthServices;
