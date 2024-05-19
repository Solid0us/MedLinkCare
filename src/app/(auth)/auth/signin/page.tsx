"use client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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
      router.push("/dashboard");
    }
  };
  return (
    <div className="flex flex-col items-center bg-violet-100 gap-3">
      <input name="csrfToken" type="hidden" />
      <input
        name="email"
        placeholder="email"
        type="text"
        onChange={(e) => (email.current = e.target.value)}
      />
      <input
        name="password"
        placeholder="password"
        type="password"
        onChange={(e) => (password.current = e.target.value)}
      />

      <button onClick={onSubmit}>Login</button>
    </div>
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
