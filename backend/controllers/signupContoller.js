import {User} from '../models/user.js';
import bcrypt from 'bcryptjs';

export const signupController=async(req,res)=>{
    const {name,email,password}= req.body;
     try{
        const hashedPassword= await bcrypt.hash(password,12);
        
        const user=await User.create({
            name,email,password:hashedPassword
        });
        
        return res.status(201).json({user: {
            userId:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            role:user.role
        }});
     }
     catch(error){
        if(error.code===11000){
            return res.status(409).json({message:"Email already exists"});
        }
        throw error;
      }
}