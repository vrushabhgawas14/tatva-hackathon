import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  reporter: { type: String, required: true },
  status: { type: Boolean, required: false },
  deadline: {
    type: Date,
    default: () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);
      return currentDate;
    },
  },
});

export const Report =
  mongoose.models.Reports || mongoose.model("Reports", reportSchema);
