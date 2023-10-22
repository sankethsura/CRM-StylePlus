import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import AboutUs from "@/app/modal/aboutUs";

export async function POST(req) {
  const { title, title2, description } = await req.json();

  try {
    await connectDB();
    await AboutUs.create({ title, title2, description });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      msg: ["Unable to send message."],
      success: false,
    });
  }
}

export async function GET() {
  try {
    await connectDB();
    const aboutUs = await AboutUs.find({}).sort({ date: -1 }).limit(1);
    return NextResponse.json({
      aboutUs,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      msg: ["Unable to fetch messages."],
      success: false,
    });
  }
}
