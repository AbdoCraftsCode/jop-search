

import mongoose from "mongoose";

export const connectDB =async () => {
    
    return await mongoose.connect(process.env.DB_URL).then(res => {
    
console.log("DB connected successfly");


    }).catch(error => {
    
        console.log("invalid-db" ,error);
        
})

}