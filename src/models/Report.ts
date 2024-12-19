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
      currentDate.setDate(currentDate.getDay() + 2);
      return currentDate;
    },
  },
  joinedPeople: [{ type: String }],
  slug: { type: String, required: false },
});

export const Report =
  mongoose.models.Reports || mongoose.model("Reports", reportSchema);
