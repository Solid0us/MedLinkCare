"use client";
import Link from "next/link";
import Button from "./Button";
import { useSession, signIn, signOut } from "next-auth/react";

const TopNavBar = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="top-0 sticky z-50 w-full h-20 flex flex-row bg-violet-300 justify-between">
        <Link href="/" className="mt-auto mb-auto text-2xl">
          <h1 className=" bg-gradient-to-r from-violet-900 to-blue-700 text-transparent bg-clip-text ">
            MedLink Care
          </h1>
        </Link>
        <div className="flex flex-row gap-x-5 mt-auto mb-auto mr-5">
          {status === "loading" ? (
            ""
          ) : (
            <>
              {!session ? (
                <>
                  <Link href="/auth/signup">
                    <Button
                      className="bg-white text-violet-900 font-bold"
                      text="Sign up"
                    />
                  </Link>
                  <Link href="/auth/login">
                    <Button
                      className="bg-white text-violet-900 font-bold"
                      text="Login"
                    />
                  </Link>
                </>
              ) : (
                <Button
                  className="bg-white text-violet-900 font-bold"
                  text="Logout"
                  onClick={() => signOut()}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
