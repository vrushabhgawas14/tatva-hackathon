"use client";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const description = formData.get("description");
      const location = formData.get("location");
      const reporterEmailID = session?.user?.email?.toString();
      console.log(reporterEmailID);

      const res = await fetch("api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          location,
          reporterEmailID,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        // All Ok
        await setError(data.message);
      }

      if (res.status === 400 || res.status === 500) {
        // Some Error
        await setError(data.message);
      }
      // eslint-disable-next-line
    } catch (err: any) {
      // Something might went wrong with fetching json or else.
      setError("Error := " + err.message);
    }
  };

  return (
    <main>
      <section className="p-10 text-black">
        {session ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4"
          >
            <div className="text-2xl sm:text-xl text-center pb-6">
              Submit Issue in your surrounding.
            </div>
            <div className="flex items-center justify-center font-semibold space-x-4">
              <label htmlFor="description" className="text-xl cursor-pointer">
                Description :
              </label>
              <input
                id="description"
                name="description"
                type="text"
                required
                placeholder="Enter description"
                className="px-2 py-1 rounded-xl text-teal-900 sm:w-40"
              />
            </div>
            <div className="flex items-center justify-center font-semibold space-x-4 pb-2">
              <label htmlFor="location" className="text-xl cursor-pointer">
                Location :
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="Enter location"
                className="px-2 py-1 rounded-xl text-teal-900 sm:w-40"
              />
            </div>
            <button
              type="submit"
              className="bg-green-950 px-4 py-1 text-red-100 border-2 border-red-100 border-opacity-90 rounded-xl ease-in duration-200 hover:bg-teal-950"
            >
              Submit
            </button>
            {error && <div>{error}</div>}
          </form>
        ) : (
          <div className="flex justify-center items-center">
            <Button text="Please Login!" url="/login" />
          </div>
        )}
      </section>
    </main>
  );
}
