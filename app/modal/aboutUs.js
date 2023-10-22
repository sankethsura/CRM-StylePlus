import mongoose, { Schema } from "mongoose";

const aboutUsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const AboutUs = mongoose.models.AboutUs || mongoose.model("AboutUs", aboutUsSchema);

export default AboutUs;