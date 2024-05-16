"use client";
import { FormEvent, useState } from "react";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
  });

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    console.log(signUpForm);
  };

  return (
    <div className="w-full h-96 p-4">
      <form
        className="flex flex-col items-center border border-violet-500 rounded-lg"
        onSubmit={(e) => handleSignUp(e)}
      >
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
