 // app/api/posts/route.js
import Post from "@/models/Post";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // 1. Connect to Database
    console.log("Attempting database connection...");
    await connectDB();
    
    // 2. Fetch Posts with timeout
    console.log("Fetching posts...");
    const posts = await Promise.race([
      Post.find().sort({ createdAt: -1 }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 10000)
      )
    ]);

    console.log(`Successfully retrieved ${posts.length} posts`);
    
    // 3. Return Response
    return NextResponse.json(posts, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);

    // Handle specific errors
    if (error.name === 'MongooseError') {
      return NextResponse.json(
        { 
          error: "Database connection error", 
          details: error.message 
        },
        { status: 500 }
      );
    }

    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { 
          error: "Network connection error", 
          details: "Could not connect to the database server" 
        },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}