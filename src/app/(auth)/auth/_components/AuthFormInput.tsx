import { HTMLInputTypeAttribute, MutableRefObject } from "react";

interface AuthFormInput {
  placeholder?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  name: string;
  errorMessage?: string;
}

const AuthFormInput = ({
  placeholder,
  type,
  label,
  name,
  errorMessage,
}: AuthFormInput) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm font-bold text-violet-600">{label}</label>
        <input
          name={name}
          className="p-2 border border-violet-700 rounded-lg max-w-52"
          placeholder={placeholder}
          type={type}
        />
        <p className="text-red-300 text-xs">{errorMessage}</p>
      </div>
    </>
  );
};

export default AuthFormInput;
