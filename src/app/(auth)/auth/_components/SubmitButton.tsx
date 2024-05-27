"use client";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  loadingMessage?: string;
  text?: string;
  onClick?: () => void;
}

const SubmitButton = ({
  text = "Submit",
  loadingMessage = "Submitting",
  onClick,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const [submittingMessage, setSubmittingMessage] = useState(loadingMessage);

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg bg-violet-600 text-white ${
        pending && "opacity-30 pointer-events-none"
      }`}
    >
      {pending ? submittingMessage : text}
    </button>
  );
};

export default SubmitButton;
