import { connectToDatabase } from "@/lib/mongoDB";
import { Report } from "@/models/Report";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { description, location, reporterEmailID } = await request.json();
    await connectToDatabase();

    const totalReports = await Report.find({});

    await Report.create({
      description: description,
      location: location,
      reporter: await reporterEmailID,
      slug: totalReports.length.toString(),
    });

    const earlierPoints = await User.findOne({ email: reporterEmailID });
    const newPoints = earlierPoints.points + 5;

    await User.updateOne(
      { email: reporterEmailID },
      { $set: { points: newPoints } }
    );

    // await newReport.save();
    return NextResponse.json(
      { message: "Report Registered Successfully." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Status : 500 = " + err },
      { status: 500 }
    );
  }
};
