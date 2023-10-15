import mongoose, { Schema } from "mongoose";

const gallerySchema = new Schema({
  gallery: {
    type: [
      {
        url: { type: String },
      },
    ],
  },
  selected:{
    type: [
      {
        url: { type: String },
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;
