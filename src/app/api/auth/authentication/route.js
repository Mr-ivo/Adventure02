import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../../utils/db";
import User from "@/app/models/User";

export const POST = async (req, res, next) =>{
    const {email, password} = await req.json();
    // connecting to database
    connectDB()
    // check if user exists
    try {
        const isUser = await User.findOne({ email: email})
        if(User){
            const isUserPassword = isUser.password
            const  isUserPasswordMatch = bcrypt.compareSync(password, isUserPassword);
        if(isUserPasswordMatch){
            return  new NextResponse(JSON.stringify({userData:isUser,message:'Successfully logged in'}),{
                status:200
            });
        }else{
            return  new NextResponse(JSON.stringify({message: "Invalid credentials"}),{
                status:400
            });
        }
        }else{
            return  new NextResponse(JSON.stringify({message: "user does not exist"}),{
                status:400
            })
        }
    } catch (error) {
        console.log(error);
        return  new NextResponse(JSON.stringify(error),{
            status:500
        }); 
    }
}
