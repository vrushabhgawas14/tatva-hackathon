import { connectToDatabase } from "@/lib/mongoDB";
import { Report } from "@/models/Report";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDatabase();
    const reports = await Report.find({});

    return NextResponse.json(reports);
  } catch (err) {
    return NextResponse.json(
      { message: "Status : 500 = " + err },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { currentUser, currentSlug } = await request.json();
    await connectToDatabase();

    const reports = await Report.findOne({ slug: currentSlug });
    if (reports.joinedPeople.includes(currentUser)) {
      return NextResponse.json(
        { message: "You have Already Joined." },
        { status: 400 }
      );
    }
    reports.joinedPeople.push(currentUser);

    await reports.save();
    return NextResponse.json(
      { message: "You have join successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Status : 500 = " + err },
      { status: 500 }
    );
  }
};
