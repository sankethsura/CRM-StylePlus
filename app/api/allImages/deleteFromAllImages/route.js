import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import AllImages from "@/app/modal/allImages";

export async function POST(req) {
  const { _id } = await req.json();
  try {
    await connectDB();

    const image = await AllImages.findOne({ _id });
    console.log(image)
    image.deleted = true;
    await image.save();

    return NextResponse.json({
      msg: ["Moved to selected successfully"],
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
