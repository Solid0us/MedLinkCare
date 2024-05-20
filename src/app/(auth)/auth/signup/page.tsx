"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import AuthFormTemplate from "../_components/AuthFormTemplate";
import AuthFormInput from "../_components/AuthFormInput";
import { SignupUserForm, signupUser } from "../_actions/signup-action";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SubmitButton from "../_components/SubmitButton";

const SignUp = () => {
  const router = useRouter();
  const [formState, formAction] = useFormState(signupUser, {
    message: "",
    errors: undefined,
    fieldValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const login = async (signupInfo: SignupUserForm) => {
    const { email, password } = signupInfo;
    const results = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });
    if (results?.error) {
      alert("Something went wrong signing you in.");
    }
    router.push("/dashboard/main");
  };

  useEffect(() => {
    if (formState.message === "success") {
      login(formState.fieldValues);
    }
  }, [formState]);

  return (
    <AuthFormTemplate>
      <form
        action={formAction}
        className="flex flex-col items-center border border-violet-500 rounded-lg gap-3 p-2"
      >
        <h1 className="font-bold text-lg text-violet-600">Register</h1>
        <div className="gap-3 flex flex-col lg:flex-row max-w-full">
          <AuthFormInput
            name="firstName"
            type="text"
            placeholder="First Name"
            label="First Name"
            errorMessage={formState.errors?.firstName}
          />
          <AuthFormInput
            name={"lastName"}
            type="text"
            placeholder="Last Name"
            label="Last Name"
            errorMessage={formState.errors?.lastName}
          />
        </div>

        <AuthFormInput
          name={"email"}
          type="text"
          placeholder="Email"
          label="Email"
          errorMessage={formState.errors?.email}
        />
        <AuthFormInput
          name={"password"}
          type="password"
          placeholder="Password"
          label="Password"
          errorMessage={formState.errors?.password}
        />
        <AuthFormInput
          name={"confirmPassword"}
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          errorMessage={formState.errors?.confirmPassword}
        />

        <SubmitButton />
      </form>
    </AuthFormTemplate>
  );
};

export default SignUp;
