import connectDB from "@/app/lib/mongodb";
import Gallery from "@/app/modal/gallery";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


export async function POST(req) {
  const { gallery ,selected} = await req.json();
  try {
    await connectDB();
    await Gallery.create({ gallery,selected });

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
    const gallery = await Gallery.find({}).sort({ date: -1 });
    return NextResponse.json({ gallery });
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to fetch messages."] });
  }
}
