import connect from "@/lib/db/dbConnect";
import User from "@/lib/db/model/userSchema";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connect();
  try {
    const { email, password, name } = await req.json();
    console.log("hehehehe", { name, email, password }); // log the data

    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    console.log("User created successfully");
    return new Response(
        JSON.stringify({ message: "User created successfully" }),
        { status: 201 }
      );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
