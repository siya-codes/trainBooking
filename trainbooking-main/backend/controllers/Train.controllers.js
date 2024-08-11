import Train from "../models/train.js";
import Users from "../models/signup.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import crypto from 'crypto'
import 'dotenv/config'
import OTP from "../models/otp.js";
export  async function CreateTraindata(req,res,next){
    let {TrainNo,TrainName,Origin,Destination,ArrivalTime,DepartureTime,Fare,SeatAvailability}=req.body;
    try {
        if(!TrainNo || !TrainName || !Origin || !Destination || !ArrivalTime || !DepartureTime || !Fare || !SeatAvailability){
            res.status(400).json({message:"Every field must be filled",success:false});
            next()
        }
        else{
            const traindata=await Train.create(req.body)
            if(traindata){
                res.status(201).json({message:"Train data inserted successfully",success:true});
next()
            }
            else{
                res.status(500).json({message:"Internal server error",success:false});
next()
            }
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error",success:false});
        next()
    }
}

export  async function Getalltraindetails(req,res,next){
    try {
        let filters = {};
    
        // Apply filters based on query parameters
        if (req.query.origin) {
            filters.Origin = { $regex: new RegExp(req.query.origin, 'i') };
          }
          if (req.query.destination) {
            filters.Destination = { $regex: new RegExp(req.query.destination, 'i') };
          }
          if (req.query.departureTime) {
            filters.DepartureTime = { $gte: new Date(req.query.departureTime) };
          }
    
        // Execute the query with applied filters
        const trains = await Train.find(filters);
    
        res.status(200).json({data:trains});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

export async function Updatetrain(req,res,next){
    let {_id,TrainNo,TrainName,Origin,Destination,ArrivalTime,DepartureTime,Fare,SeatAvailability}=req.body;
    try {
        if(!_id || !TrainNo || !TrainName || !Origin || !Destination || !ArrivalTime || !DepartureTime || !Fare || !SeatAvailability){
            res.status(400).json({message:"Every field must be filled",success:false});
            next()
        }
        else{
            const data=await Train.findOne({_id});
            if(data){
                const newdata=await Train.findByIdAndUpdate(_id,req.body,{new: true})
                if(newdata){
                    res.status(200).json({success:true,message:"Data updated successfully",newdata})
                }
                else{
                    res.status(500).json({success:false,message:"Unable to update data"})
                }
            }
            else{
                res.status(500).json({success:false,message:"Train record not found"})
            }
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})

    }
}
export async function Gettraindatabyid(req,res,next){
    let {_id}=req.query;
     try {
        if(!_id){
            res.status(404).json({success:false,message:"Id required"})
        }
        else{
            const data=await Train.find({_id})
            if(!data){
                res.status(404).json({success:false,message:"Train data not found"})

            }
            else{
                res.status(200).json({success:true,message:"Data fetched successfully",data})
  
            }

        }
     } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})

     }
}
export async function DeleteTrain(req,res,next){
    let {_id}=req.query;
     try {
        if(!_id){
            res.status(404).json({success:false,message:"Id required"})
        }
        else{
            const data=await Train.find({_id})
            if(!data){
                res.status(404).json({success:false,message:"Train data not found"})

            }
            else{
                const response=await Train.findByIdAndDelete(_id)
                    if (!response){ 
                        res.status(404).json({success:false,message:"Unable to delete train"})

                    } 
                    else{ 
                        res.status(200).json({success:true,message:"Train deleted successfully",data:response})
                    } 
              

            }

        }
     } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})

     }
}
export async function Bookticket(req,res,next){
    let {userId,trainId}=req.query;
    try {
        // Find the user and train
        const user = await Users.findById(userId);
        const train = await Train.findById(trainId);
    
        if (!user) {
          res.status(404).json({success:false,message:"User not found!"})
        }
    
        if (!train) {
            res.status(404).json({success:false,message:"Train not found!"})
        }
    
        // Check if there are available seats
        if (train.SeatAvailability <= 0) {
            res.status(400).json({success:false,message:"No seats available"})
        }
    
        // Allocate a seat number (example logic, you might want a different seat allocation logic)
        const seatNumber = train.BookedSeats.length + 1;
    
        // Decrement available seats and add booked seat
        train.SeatAvailability -= 1;
        train.BookedSeats.push({ seatNumber, userId });
    
        // Save the train document
        await train.save();
        req.ticketdetails={train,seatNumber,user};
    
        
        next()
    res.status(201).json({success:true,message:"Ticket booked successfully"})
      } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})
    }
}
export async function Sendmails(req,res,next){
    // res.status(200).json(req.ticketdetails)
    console.log(req.ticketdetails);
    try {function Gettime(dateString) {
        const dateObject = new Date(dateString);
        const date = new Date(dateString);
    
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    
        const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
        let hours = dateObject.getUTCHours();
        const minutes = dateObject.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedDate} ${hours}:${formattedMinutes} ${ampm}`;
      }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          port: 465,
          secure: true, // Use `true` for port 465, `false` for all other ports
          auth: {
            user: process.env.USEREMAIL,
            pass: process.env.PASSWORD,
          },
        });
    
        const info = await transporter.sendMail({
          from: {
            name: 'Train Ticket Booking System',
            address: process.env.USEREMAIL,
          },
          to: `${req.ticketdetails.user.Email}`, // Replace with recipient email
          subject: "Ticket Confirmation", // Subject line
          html: `
          <h2 style="color: #333;">Your Train Ticket and Seat Information</h2>
          <div style="background: #f5f5f5; padding: 15px; margin-bottom: 20px;">
              <h3>Train Journey Details</h3>
              <p><strong>Train Name and Number:</strong> ${req.ticketdetails.train.TrainName}/${req.ticketdetails.train.TrainNo}</p>
              <p><strong>Departure Date and Time:</strong> ${Gettime(req.ticketdetails.train.DepartureTime)}</p>
              <p><strong>Arrival Date and Time:</strong> ${Gettime(req.ticketdetails.train.ArrivalTime)}</p>
              <p><strong>Destination :</strong> ${req.ticketdetails.train.Destination}</p>
              <p><strong>Origin :</strong> ${req.ticketdetails.train.Origin}</p>
              <p><strong>Ticket Cost :</strong> ${req.ticketdetails.train.Fare}</p>
          </div>
  
          <div style="background: #f5f5f5; padding: 15px; margin-bottom: 20px;">
              <h3>Passenger Information</h3>
              <p><strong>Passenger Name:</strong> ${req.ticketdetails.user.FirstName} ${req.ticketdetails.user.LastName}</p>
              <p><strong>Contact Information:</strong> ${req.ticketdetails.user.PhoneNumber}</p>
          </div>
  
          <div style="background: #f5f5f5; padding: 15px; margin-bottom: 20px;">
              <h3>Seat Information</h3>
              <p><strong>Seat Number:</strong> ${req.ticketdetails.seatNumber}</p>
              <a href='https://trainbooking.vercel.app/getticket?userId=${req.ticketdetails.user._id}&trainId=${req.ticketdetails.train._id}&seat=${req.ticketdetails.seatNumber}' target="_blank"><strong>Download your ticket:</strong></a>
          </div>
  
          <div style="margin-top: 20px; font-size: 1em;">
              <p>If there are any discrepancies or if you have any questions, feel free to reach out to us at trainbooking028@gmail.com.</p>
              <p>We wish you a pleasant journey and thank you for choosing to travel with us.</p>
          </div>
      `
        });
    res.status(200).end()
        // res.status(200).json(info);
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}

export async function getUserDetailsWithBookings(req,res,next) {
    try {
        const users = await Train.find().populate({
            path: 'BookedSeats.userId',
            select: 'FirstName LastName UserName PhoneNumber Email'
        }).exec();
        if(users){
            res.status(200).json({success:true,users})
        }
        else{
            res.status(404).json({success:false,message:"No bookings founds"})

        }
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})
        throw error;
    }
}

export async function Getbookingsofuser(req,res,next){
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const userObjectId = mongoose.Types.ObjectId.createFromHexString(userId);

        // Find all trains where the user has booked seats
        const trains = await Train.find({ "BookedSeats.userId": userObjectId })
            .populate({
                path: 'BookedSeats.userId',
                select: 'FirstName LastName UserName PhoneNumber Email',
            })
            .exec();
            console.log(trains);

        // Prepare a detailed list of bookings
        const bookings = trains.flatMap(train => {
            return train.BookedSeats
                .map(seat => ({
                    TrainNo: train.TrainNo,
                    TrainName: train.TrainName,
                    Origin: train.Origin,
                    Destination: train.Destination,
                    ArrivalTime: train.ArrivalTime,
                    DepartureTime: train.DepartureTime,
                    Fare: train.Fare,
                    seatNumber: seat.seatNumber,
                    user: seat.userId
                }));
        });
        if (bookings.length > 0) {
            res.status(200).json({ success: true, bookings });
        } else {
            res.status(404).json({ success: false, message: "No bookings found for this user" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        // next(error);
    }
}
export async function Trainfilters(req,res,next){
    try {
        let filters = {};
    
        // Apply filters based on query parameters
        if (req.query.origin) {
            filters.Origin = { $regex: new RegExp(req.query.origin, 'i') };
          }
          if (req.query.destination) {
            filters.Destination = { $regex: new RegExp(req.query.destination, 'i') };
          }
          if (req.query.departureTime) {
            filters.DepartureTime = { $gte: new Date(req.query.departureTime) };
          }
    
        // Execute the query with applied filters
        const trains = await Train.find(filters);
    
        res.status(200).json(trains);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

export async function Getticket(req,res,next){
    let {userId,trainId}=req.query;
    try {
        if(!userId || !trainId){
            res.status(404).json({success:false,message:"User id and Train id is required"})
        }
        else{
            const train=await Train.findById(trainId);
            const user=await Users.findById(userId);
            res.status(200).json({train,user,success:true})
        }
    } catch (error) {
        res.status(200).json({success:true,message:"Internal server error"})

    }
}
function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
  }
  async function sendOTP(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.USEREMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      const info = await transporter.sendMail({
        from: {
          name: 'Train Ticket Booking System',
          address: process.env.USEREMAIL,
        },
        to: `${email}`, // Replace with recipient email
        subject: "OTP Verfication", // Subject line
        html: `<p>Your OTP is <strong>${otp}</strong></p>`
      });
  }
export async function Generateotp(req,res,next){
    const email = req.body.email;
const data=await Users.findOne({Email:email})
if(data){
    res.status(400).json({message:"Email already exists",success:false})
}
else{
  const otp = generateOTP();

  try {
    await OTP.create({ email, otp });
    await sendOTP(email, otp);
    res.status(200).json({message:"OTP sent successfully",success:true});
  } catch (error) {
    res.status(500).json({message:"Incorrect Email",success:false});
    // console.error(error);
  }
}
}
export async function Verifyotp(req,res,next){

    const { email, otp } = req.body;

    try {
      const otpEntry = await OTP.findOne({ email, otp });
  
      if (otpEntry) {
        await OTP.deleteOne({ _id: otpEntry._id }); 
        res.status(200).json({message:"OTP verified successfully",success:true});
    } else {
        res.status(400).json({message:"Invalid OTP",success:false});
      }
    } catch (error) {
      res.status(500).send('Error verifying OTP');
      console.error(error);
    }
}