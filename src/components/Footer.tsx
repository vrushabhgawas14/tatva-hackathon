import { ConnectColumn, ExploreColumn } from "@/constants/FooterDetails";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer
        id="footer"
        className="flex flex-col bg-teal-950 text-white sm:pt-12"
      >
        {/* Actual Footer */}
        <section className="flex justify-between m-10 sm:flex-col ">
          {/* Left Side */}
          <div className="p-4 space-y-4 text-center">
            <Link href="/" className="text-4xl sm:text-3xl">
              Eco Friendly
            </Link>
          </div>
          {/* Right Side */}
          <div className="flex sm:flex-wrap items-start justify-evenly sm:justify-between lg:w-[60%] md:w-[50%] sm:mt-10">
            {/* Explore */}
            <div>
              <h1 className="text-3xl py-4">Explore</h1>
              {ExploreColumn.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="flex flex-col py-2 text-xl underline"
                >
                  {item.text}
                </Link>
              ))}
            </div>
            {/* Connect */}
            <div>
              <h1 className="text-3xl py-4">Connect</h1>
              {ConnectColumn.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="flex flex-col py-2 text-xl underline"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Me */}
        <section className="text-center pt-4 pb-2 w-full space-y-1 text-sm opacity-95">
          <div>© 2024 Developed by Vrushabh and team.</div>
        </section>
      </footer>
    </>
  );
}
