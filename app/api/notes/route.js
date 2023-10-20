//create a route for the notes api
import connectDB from "@/app/lib/mongodb";
import Notes from "@/app/modal/notes";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req, res) {
  //add notes to the database with contactId
  const { notes, bookmark, contactId } = await req.json();

  if (!contactId) {
    return NextResponse.json({ msg: ["Please select a contact."] });
  }

  try {
    await connectDB();
    await Notes.create({ notes, bookmark, contactId });

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

export async function GET(req, res) {
  const contactId = await req.nextUrl.searchParams.get("contactId");
  try {
    await connectDB();
    const notes = await Notes.find({ contactId }).sort({ date: -1 }).limit(1);
    return NextResponse.json({ notes });
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to fetch messages."] });
  }
}
