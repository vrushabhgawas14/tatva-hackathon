"use client";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ReportIsse() {
  const [reportDetails, setReportsDetails] = useState([]);
  const [joiningMessage, setJoiningMessage] = useState("");
  const { data: session } = useSession();

  const fetchReports = async () => {
    try {
      const currResponse = await fetch("api/getReports");
      const currData = await currResponse.json();

      if (currResponse.status === 500) {
        await console.log(currData.message);
      }
      setReportsDetails(currData);

      // eslint-disable-next-line
    } catch (err: any) {
      console.log("Error from homepage:= " + err.message);
    }
  };

  // fetchShops();
  useEffect(() => {
    fetchReports();
  });

  async function updateReportUser(currentSlug: number) {
    const currentUser = await session?.user?.email;

    try {
      const res = await fetch("api/getReports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUser,
          currentSlug,
        }),
      });
      const data = await res.json();

      if (res.status === 500) {
        await console.log(data.message);
      }
      if (res.status === 201) {
        await setJoiningMessage(data.message);
      }
      if (res.status === 400) {
        await setJoiningMessage(data.message);
      }
      // eslint-disable-next-line
    } catch (err: any) {
      console.log("Error from report page:= " + err.message);
    }
  }
  return (
    <>
      <main>
        <section className="flex justify-center items-center p-10 text-white">
          <div className="space-y-4">
            {reportDetails.map(
              (
                item: {
                  description: string;
                  location: string;
                  reporter: string;
                  deadline: Date;
                  slug: number;
                },
                index
              ) => (
                <div
                  key={index}
                  className="bg-teal-950 p-4 rounded-xl w-[60vw] sm:w-[80vw]"
                >
                  <div className="space-y-2">
                    <p>Description : {item.description}</p>
                    <p>Location : {item.location}</p>
                  </div>
                  <div className="pt-8 flex justify-between sm:space-y-2 sm:flex-col">
                    <p>Admin: {item?.reporter}</p>
                    <p>Deadline : {item?.deadline.toString().split("T")[0]}</p>
                  </div>
                  <div className="flex justify-center items-center space-x-2 pt-4">
                    {session?.user?.email !== item.reporter &&
                      session?.user && (
                        <button
                          onClick={() => updateReportUser(item?.slug)}
                          className="bg-green-950 px-4 py-1 text-red-100 border-2 border-red-100 border-opacity-90 rounded-xl ease-in duration-200 hover:bg-teal-950 text-xl"
                        >
                          Join Movement
                        </button>
                      )}

                    {session?.user?.email === item.reporter && (
                      <Button text="View Dashboard" url="/dashboard" />
                    )}
                  </div>
                  <div className="text-center pt-4">{joiningMessage}</div>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
}
