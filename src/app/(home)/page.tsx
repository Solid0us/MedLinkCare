import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen">
      <div className="w-full">
        <div className="flex flex-col items-center xl:flex-row xl:items-start justify-between m-10 border border-blue-700 rounded-lg gap-y-5  p-5">
          <div className="relative w-full max-w-3xl flex flex-col items-center">
            <Image
              className=""
              src="/static/freepik_intro.jpg"
              alt=""
              height={5000}
              width={5000}
            />
          </div>
          <div className="flex flex-col items-center gap-y-5">
            <h1 className="font-bold text-4xl text-blue-700 text-center">
              Your Access to Health Care Matters
            </h1>
            <p className="text-2xl">
              Our mission is to help uninsured patients find affordable
              healthcare. Simply sign up and start browsing verified health care
              providers near you!
            </p>
            <Link href="/auth/login">
              <Button
                className="bg-violet-500 text-white hover:bg-violet-600 duration-200"
                text="Get Started Today"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
