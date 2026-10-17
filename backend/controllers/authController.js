import {User} from '../models/user.js';
import bcrypt from 'bcryptjs';
import { signAcessToken,setRefreshCookie } from '../utils/tokens.js';

const dummy_hash= bcrypt.hashSync("dummy_password",12);

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



export const loginController=async(req,res)=>{
    const {email,password}=req.body;

    const user=  await User.findOne({email}).select("+password");

    const isMatch= await bcrypt.compare(password,
        user?user.password:dummy_hash
    )
    if(!user||!isMatch){
        res.status(404).json({message:'Invalid email or password'});
    }

    const access_token= signAcessToken(user);

    setRefreshCookie(res,user);

    res.status(200).json({
        access_token,
        user:{
           id: user._id,
           name:user.name,
            email: user.email,
            role: user.role
        }
    })
}


