import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String ,
        trim: true,
        required: [true, "password is required"]
    }
}, { timestamps: true });

const model = mongoose.model('user', schema);
export default model;




// mongoose-aggregate-paginate-v2  important for aggregration
// bcryptjs
