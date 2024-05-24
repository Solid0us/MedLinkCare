interface AuthFormTemplateProps {
  children: any;
}

const AuthFormTemplate = ({ children }: AuthFormTemplateProps) => {
  return (
    <div className="flex flex-col w-5/6 mr-auto ml-auto p-4">
      <div className="flex flex-row justify-center border border-violet-500 rounded-lg gap-3 p-2">
        {children}
      </div>
    </div>
  );
};

export default AuthFormTemplate;
