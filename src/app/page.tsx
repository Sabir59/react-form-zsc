import { SignUp } from "@/components/auth/SignUp";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="p-8 mx-auto max-w-lg">
        <SignUp />
        <Toaster />
      </div>
    </>
  );
}
