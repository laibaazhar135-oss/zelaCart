import express from 'express';
import { authRouter } from './routes/authRoutes.js';

export const app = express();
app.use(express.json());

app.get('/health',(req,res)=>{
    res.json({status:'ok'})
});

app.use('/auth',authRouter);

app.use((error,req,res,next)=>{
    console.error(error);
    const status= error.status||500;
    res.status(status).json({message:status===500? 'Server error':'Bad request'});
});
