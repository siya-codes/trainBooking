import jwt from 'jsonwebtoken'
import Signup from '../models/signup.js';
export async function Authenticate(req,res,next){

    try {
        let auth=req.headers.authorization;
        if(!auth){
            res.status(400).send({success:false,message:"Token required"})
        }
        else{
    let token=auth.split(" ")[1]
        let decoded=await jwt.verify(token,process.env.SECRET_KEY)
            
        let user=await Signup.findOne({email:decoded.email})
        if(user){
            req.user=user;
            req.email=user.email;
            next()
        }
        else{
            res.status(400).send({success:false,message:"User doesn't exist"})
            next()
        }
    }
    } catch (error) {
        res.status(500).send({success:false,message:"Internal Server Error in authentication"})
    
    }
    }