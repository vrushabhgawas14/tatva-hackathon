import { connectToDatabase } from "@/lib/mongoDB";
import { Report } from "@/models/Report";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { description, location, reporterEmailID } = await request.json();
    await connectToDatabase();

    // console.log(reporterEmailID);
    await Report.create({
      description: description,
      location: location,
      reporter: await reporterEmailID,
    });

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
