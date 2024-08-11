import mongoose from "mongoose";
const schema=mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    UserName:{
        type:String,
        required:true,
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Role:{
        type: String,
        enum: ['user' , 'admin'],
        default: 'user'
    }
})
const Users=mongoose.model('Users',schema);
export default Users;