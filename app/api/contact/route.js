import connectDB from "@/app/lib/mongodb"
import Contact from "@/app/modal/contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const { fullname, email, message,phoneNumber } = await req.json();

  try {
    await connectDB();
    await Contact.create({ fullname, email, message, phoneNumber });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to send message."] });
    }
  }
}

//create a get function for the contact us

export async function GET() {
    try {
      await connectDB();
      const contacts = await Contact.find({}).sort({ date: -1 });
      return NextResponse.json({ contacts });
    } catch (error) {
      return NextResponse.json({ msg: ["Unable to fetch messages."] });
    }
  }
  
  