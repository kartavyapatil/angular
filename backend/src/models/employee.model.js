import mongoose from "mongoose";
const schema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    dateofbirth:{
        type:Date,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true});
const model=mongoose.model('employee',schema);
export default model;