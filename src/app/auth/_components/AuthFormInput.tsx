import { HTMLInputTypeAttribute, MutableRefObject } from "react";

interface AuthFormInput {
  formRef: MutableRefObject<string>;
  placeholder?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
}

const AuthFormInput = ({
  formRef,
  placeholder,
  type,
  label,
}: AuthFormInput) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm font-bold text-violet-600">{label}</label>
        <input
          className="p-2 border border-violet-700 rounded-lg max-w-52"
          placeholder={placeholder}
          type={type}
          onChange={(e) => (formRef.current = e.target.value)}
        />
      </div>
    </>
  );
};

export default AuthFormInput;
