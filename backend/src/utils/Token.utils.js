import jwt from "jsonwebtoken";
import Public_data from "../constants2.js";
export const generatoken =(user,expire="1d")=>{
    const token=jwt.sign({user:user._id},Public_data.JWT_auth,{expiresIn:expire})
    return token
}

 export const validate =(token)=>{
    const tokens=jwt.verify(token,Public_data.JWT_auth)
    return tokens
}