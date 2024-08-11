import mongoose from "mongoose";
const schema=mongoose.Schema({
    TrainNo:{
        type:Number,
        required:true,
    },
    TrainName:{
        type:String,
        required:true,
    },
    Origin:{
        type:String,
        required:true,
    },
    Destination:{
        type:String,
        required:true
    },
    ArrivalTime:{
        type:Date,
        required:true,
        default:Date.now()
    },
    DepartureTime:{
        type:Date,
        required:true,
        default:Date.now()
    },
    Fare:{
        type:Number,
        required:true,
    },
    SeatAvailability:{
        type:Number,
        required:true,
    },
    BookedSeats: [{ seatNumber: Number, userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' } }],
})
const Train=mongoose.model('Trains',schema);
export default Train;