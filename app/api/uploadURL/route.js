import connectDB from "@/app/lib/mongodb";
import Dashboard from "@/app/modal/dashboard";
import { NextResponse } from "next/server";
const multiparty = require("multiparty");

const fs = require("fs");
const { S3 } = require("aws-sdk");
const formidable = require("formidable");

const s3 = new S3({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const generateUploadURLForS3 = async (fileName, fileType, filePath) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filePath,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read",
  };

  try {
    const presignedURL = await s3.getSignedUrlPromise("putObject", params);
    return {
      url: presignedURL,
      filePath: filePath,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export async function POST(req) {
  //fileName, fileType, filePath
  const { fileName, fileType, filePath } = await req.json();

  try {
    const data = await generateUploadURLForS3(fileName, fileType, filePath);
    console.log(data, "data");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ msg: ["Unable to upload image."] });
  }
}
