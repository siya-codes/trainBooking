import mongoose, { Mongoose } from "mongoose";
const schema=mongoose.Schema({
    Userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    Trainid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Trains'
    },
    SeatNo:{
        type:Number,
        default:0
    }

})
const Bookings=mongoose.model('Bookings',schema);
export default Bookings;