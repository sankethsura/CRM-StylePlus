import mongoose, { Schema } from "mongoose";

const dashboardSchema = new Schema({
  whatWeDo: {
    type: [
      {
        title: {
          type: String,
          required: [true, "Title is required."],
          trim: true,
          minLength: [2, "Title must be larger than 2 characters"],
          maxLength: [200, "Title must be lesser than 200 characters"], // Updated maxLength
        },
        description: {
          type: String,
          required: [true, "Description is required."],
          trim: true,
          minLength: [2, "Description must be larger than 2 characters"],
          maxLength: [200, "Description must be lesser than 200 characters"], // Updated maxLength
        },
      },
    ],
    required: [true, "What we do is required."],
    validate: {
      validator: function (array) {
        return array.length === 3;
      },
      message: "What we do should have exactly 3 items.",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Dashboard =
  mongoose.models.Dashboard || mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;
