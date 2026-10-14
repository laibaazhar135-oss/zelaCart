import 'dotenv/config';
import { connectDb } from './config/db.js';
import { app } from './app.js';

const PORT=process.env.PORT||5000;

export const start=async()=>{
    try{
         await connectDb();
         
         app.listen(PORT,(error)=>{
             if (error) {
        console.error("Server failed to start:", error.message);
        process.exit(1);
      }
            console.log(`Server is running at http://localhost:${PORT}`);
         });
    }
    catch(error){
        console.log(`Startup fails`,error.message);
        process.exit(1);
    }
}

start();