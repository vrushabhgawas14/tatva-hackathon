"use client";
import Button from "@/components/Button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  if (!session)
    return <p className="text-center py-20 text-3xl">Loading...!</p>;

  return (
    <>
      <main className="text-center pt-20 pb-5">
        <div className="flex items-center justify-center">
          {session.user?.image && (
            <Image
              height={100}
              width={100}
              src={session.user?.image}
              alt="My Image"
              className="border-2 border-background-start rounded-3xl"
            />
          )}
        </div>
        <div className="py-2 pt-4 px-2 text-3xl sm:text-2xl text-black">
          Hello {session.user?.name || session.user?.email}
        </div>
        <div className="pt-10">
          <Button text="LogOut" url="/" onClick={signOut} />
        </div>
      </main>
    </>
  );
}
