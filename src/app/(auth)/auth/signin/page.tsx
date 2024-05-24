"use client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import AuthFormTemplate from "../_components/AuthFormTemplate";
import AuthFormInput from "../_components/AuthFormInput";
import SubmitButton from "../_components/SubmitButton";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const email = useRef("");
  const password = useRef("");
  const onSubmit = async () => {
    const results = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    });
    if (results?.error) {
      alert("Invalid username or passowrd");
    } else {
      router.push("/dashboard/main");
    }
  };
  return (
    <AuthFormTemplate>
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-lg text-violet-600">Welcome Back!</h1>
        <input name="csrfToken" type="hidden" />
        <AuthFormInput
          label="Email"
          placeholder="email"
          type="text"
          name="email"
          onChange={(e) => (email.current = e.target.value)}
        />
        <AuthFormInput
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <SubmitButton onClick={onSubmit} text="Log in"></SubmitButton>
        <p className="text-sm text-center pt-5 pb-5">
          Don't have an account?
          <Link href="/auth/signup">
            <span className="text-violet-800 font-bold"> Sign up here.</span>
          </Link>
        </p>
      </div>
    </AuthFormTemplate>
  );
};
export default SignIn;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
