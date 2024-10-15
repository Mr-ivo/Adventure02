import Post from "@/models/Post";
import connectDB from "../../../utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // connection to the database
    await connectDB();
    // find all post in the database
    const posts = await Post.find();
    console.log(posts)
    // return the posts as a json
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    // if there is an error, return a 500 status code

    return new NextResponse("Database Error", { status: 500 });
  }
};
