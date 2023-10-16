import mongoose, { Schema } from "mongoose";

const allImagesSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    selected: {
        type: Boolean,
        default: false,
    },
});

const AllImages =
    mongoose.models.AllImages || mongoose.model("AllImages", allImagesSchema);
