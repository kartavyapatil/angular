import httpStatus from "http-status"
import ApiError from "../utils/ApiError.js"
import { validate } from "../utils/Token.utils.js"

const Authentication =(req,res,next)=>{
    try {
        const header=req.headers['authorization'] || ''
        if(!header || !header.startsWith("Bearer ")){
            throw new ApiError(httpStatus.UNAUTHORIZED,"please login first")
        }
        const auth_token=header.split(" ")[1]

        if(!auth_token){
            throw new ApiError(httpStatus.UNAUTHORIZED,"please provide validation")
        }

        const data =validate(auth_token)
        req.user=data.user
        next()

    } catch (error) {
        next(error)
    }
}


export default Authentication