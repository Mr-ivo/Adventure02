import Post from "@/models/Post";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";


export async function GET(req, {params}){
    const {id} = params
    try {
        connectDB();
       const res = await Post.findById(id) 
       return new NextResponse(JSON.stringify(res),{status:201})
    } catch (error) { 
        return new NextResponse(error, {status:404})
    }
}