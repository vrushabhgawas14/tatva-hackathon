"use client";
import { FormButton } from "@/components/FormButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  isLogin?: boolean;
}

export default function LoginRegisterForm({ isLogin }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex items-center justify-center my-10 px-8 min-w-screen text-zinc-200">
      <section className="flex flex-col items-center p-4 bg-teal-900 rounded-xl w-96">
        <h1 className="text-3xl font-bold">
          {isLogin ? "Login" : "Registration"}
        </h1>
        <div className="py-6 w-[95%] flex flex-col items-center space-y-2">
          <div onClick={() => setLoading(!loading)}>
            <FormButton
              text={`${isLogin ? "Sign in" : "Continue"} with Google`}
              onClick={() => signIn("google")}
              loading={loading}
            />
          </div>
          <div>
            {isLogin ? (
              <div className="py-2">
                Don&apos;t have an account?
                <Link href="/register" className="pl-1 font-bold underline">
                  Register
                </Link>
              </div>
            ) : (
              <div className="py-2">
                Already have an account?
                <Link href="/login" className="pl-1 font-bold underline">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
