interface ButtonProps {
  className?: string;
  text: string;
  onClick?: () => any;
}

const Button = ({ className, text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`p-2 rounded-md ${className}`}>
      {text}
    </button>
  );
};

export default Button;
