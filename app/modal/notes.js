import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema({
  notes: {
    type: String,
    default: "",
  },
  bookmark: {
    type: Boolean,
    default: false,
  },
  contactId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.models.Notes || mongoose.model("Notes", notesSchema);

export default Notes;