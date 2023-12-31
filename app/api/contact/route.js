import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/modal/contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Notes from "@/app/modal/notes";

export async function POST(req) {
  const { fullname, email, message, phoneNumber } = await req.json();

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

    const notes = [];
    for (let i = 0; i < contacts.length; i++) {
      const contactId = contacts[i]._id;
      const note = await Notes.find({ contactId })
        .sort({
          date: -1,
        })
        .limit(1);
      notes.push(note[0] || []);
    }

    const obj = [];
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const note = notes[i];
      obj.push({ ...contact._doc, note });
    }

    return NextResponse.json({ contacts: obj });
  } catch (error) {
    return NextResponse.json({ msg: ["Unable to fetch messages."] });
  }
}
