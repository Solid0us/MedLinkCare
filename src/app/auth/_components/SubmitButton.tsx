"use client";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  loadingMessage?: string;
  text?: string;
}

const SubmitButton = ({
  text = "Submit",
  loadingMessage = "Submitting",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const [submittingMessage, setSubmittingMessage] = useState(loadingMessage);

  return (
    <button
      className={`p-3 rounded-lg bg-violet-600 text-white ${
        pending && "opacity-30 pointer-events-none"
      }`}
    >
      {pending ? submittingMessage : text}
    </button>
  );
};

export default SubmitButton;
