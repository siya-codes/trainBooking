import { nanoid } from "nanoid";
import Users from "../models/signup.js";
import jwt from 'jsonwebtoken'
import multer from "multer";
import bcrypt from 'bcrypt'


export async function Signupcontroller(req, res, next) {
    // "FirstName": FirstName,
    //         "LastName": LastName,
    //         "PhoneNumber":PhoneNumber,
    //         "UserName": UserName,
    //         "Email": Email,
    //         "Password": Password
    const { FirstName, LastName, PhoneNumber,UserName,Email, Password} = req.body;
    // console.log(req.body);
    // console.log("profile", req.profile); // log the profile information
  
    if (!FirstName ||  !LastName ||  !PhoneNumber || !UserName || !Email ||  !Password) {
      res.status(400).json({ success: false, message: "Every field must be filled" });
      return next();
    }
  
    const user = await Users.findOne({ Email });
    if (user) {
      res.status(400).json({ success: false, message: "Email already exists" });
      return next();
    }
  
  
    // const data = await Signup.findOne({ email: email });

        bcrypt.hash(Password,10,async function(error,hash){
            if(!error){
               let temp=await Users.create({  FirstName, LastName, PhoneNumber,UserName,Email, Password:hash });
                // console.log(temp);
                jwt.sign({ FirstName, LastName, PhoneNumber,UserName,Email,userId:temp._id}, process.env.SECRET_KEY, (error, token) => {
                    if (!error) {
                      res.status(201).json({ success: true, message: "User registered successfully",token });
                      next();
                    } else {
                      res.status(500).json({ success: false, message: "Error generating token" });
                      next();
                    }
                  });
            }
        })
        
    
}

export async function Login(req,res){
    let {Email, Password}=req.body;
    // console.log(req.body);
    try {
        if(!Email || !Password){
            res.status(400).json({success:false,message:"Every field required"})
        }
        else{
            
            const data=await Users.findOne({Email})
            // console.log(data);
            if(data){
                bcrypt.compare(Password,data.Password,function(error,result){
                    
                    if(result){
                        jwt.sign({
                            FirstName:data.FirstName, 
                            LastName:data.LastName, 
                            PhoneNumber:data.PhoneNumber,
                            UserName:data.UserName,
                            Email:data.Email,
                            userId:data._id
                            
                            
                        },process.env.SECRET_KEY,(error,token)=>{
                            if(!error){
                                res.status(200).json({success:true,message:"User Login successfully",token})
                            }
                        })
                    }
                    else{
                        res.status(400).json({success:false,message:"wrong password"})

                    }
                })
                
            }
            else{
                res.status(404).json({success:false,message:"Credentials are wrong",token})
            }
            
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})

    }
}
export async function AdminLogin(req,res){
    let {Email, Password}=req.body;
    try {
        if(!Email || !Password){
            res.status(400).json({success:false,message:"Every field required"})
        }
        else{
            
            const data=await Users.findOne({Email,Role:"admin"})
            // console.log(data);
            if(data){
                bcrypt.compare(Password,data.Password,function(error,result){
                    
                    if(result){
                        jwt.sign({
                            FirstName:data.FirstName, 
                            LastName:data.LastName, 
                            PhoneNumber:data.PhoneNumber,
                            UserName:data.UserName,
                            Email:data.Email
                            
                            
                        },process.env.SECRET_KEY,(error,token)=>{
                            if(!error){
                                res.status(200).json({success:true,message:"User Login successfully",token})
                            }
                        })
                    }
                    else{
                        res.status(400).json({success:false,message:"wrong password"})

                    }
                })
                
            }
            else{
                res.status(404).json({success:false,message:"Credentials are wrong",token})
            }
            
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})

    }
}

export async function handleFiles(req,res,next){
  try {
    if(!req.profile){
        res.status(400).json({success:false,message:"Image required"})
    }
    else{
        await Users.findOneAndUpdate({email:req.body.email},{profile:req.profile.toString()},{new :true})
        res.status(200).json({success:true,message:"updated"})
    }
  } catch (error) {
    
  }
}

export async function Getuser(req,res,next){
    try {
        let {email}=req.body;
        let user=await Users.findOne({email})
        // res.set('Content-Type', 'text/html');
        // res.render(`<img src='./uploads/${user.profile}'/>`)
        let imagePath=`../uploads/${user.profile}`
        res.render('index',{imagePath})
    } catch (error) {
        
    }
}
