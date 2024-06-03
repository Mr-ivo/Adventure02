import Post from "@/models/Post";
import { NextResponse } from "next/server";
import connectDB from "../../../utils/db";

export const GET = async () => {
  try {
    // connection to the database
    await connectDB();
    // find all post in the database
    const posts = await Post.find();
    // return the posts as a json
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    // if there is an error, return a 500 status code

    return new NextResponse("Database Error", { status: 500 });
  }
};
