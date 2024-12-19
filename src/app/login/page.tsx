"use client";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  if (session) return <p className="text-center py-20 text-3xl">Loading...</p>;

  return (
    <>
      <LoginRegisterForm isLogin={true} />
    </>
  );
}
