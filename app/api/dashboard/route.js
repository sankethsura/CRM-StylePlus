import connectDB from "@/app/lib/mongodb";
import Dashboard from "@/app/modal/dashboard";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

//create a get function for the dashbaord and post function for the dashboard

export async function POST(req) {
  const { whatWeDo } = await req.json();

  try {
    await connectDB();
    await Dashboard.create({ whatWeDo });

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

export async function GET() {
  try {
    await connectDB();
    const dashboard = await Dashboard.find({}).sort({ date: -1 });
    return NextResponse.json({ dashboard });
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to fetch messages."] });
  }
}
