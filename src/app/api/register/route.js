import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/utils/db";

export const POST = async (req, res) => {
  try {
    // Parse the incoming request body
    const { username, email, password } = await req.json();

    // Connect to the database
    await connectDB();

    // Check if the user already exists
    const isUser = await User.findOne({ email });
    if (isUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 5);

    // Create a new user
    const newUser = new User({
      username, // Ensure this matches your User model field
      email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    return new NextResponse(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
};
