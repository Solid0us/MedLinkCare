interface AuthFormTemplateProps {
  children: any;
}

const AuthFormTemplate = ({ children }: AuthFormTemplateProps) => {
  return (
    <div className="flex flex-col w-4/6 mr-auto ml-auto p-4">{children}</div>
  );
};

export default AuthFormTemplate;
