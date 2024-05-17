"use client";
import { FormEvent, useRef, useState } from "react";
import AuthFormTemplate from "../_components/AuthFormTemplate";
import AuthFormInput from "../_components/AuthFormInput";

const SignUp = () => {
  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confirmPassowrd = useRef("");

  const handleSignUp = async () => {
    console.log(firstName, lastName);
  };

  return (
    <AuthFormTemplate>
      <div className="flex flex-col items-center border border-violet-500 rounded-lg gap-3 p-2">
        <h1 className="font-bold text-lg text-violet-600">Register</h1>
        <div className="gap-3 flex flex-col lg:flex-row max-w-full">
          <AuthFormInput
            type="text"
            placeholder="First Name"
            label="First Name"
            formRef={firstName}
          />
          <AuthFormInput
            type="text"
            placeholder="Last Name"
            label="Last Name"
            formRef={lastName}
          />
        </div>

        <AuthFormInput
          type="text"
          placeholder="Email"
          label="Email"
          formRef={email}
        />
        <AuthFormInput
          type="password"
          placeholder="Password"
          label="Password"
          formRef={password}
        />
        <AuthFormInput
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          formRef={confirmPassowrd}
        />
        <button
          className="p-3 rounded-lg bg-violet-600 text-white"
          onClick={handleSignUp}
        >
          Signup
        </button>
      </div>
    </AuthFormTemplate>
  );
};

export default SignUp;
