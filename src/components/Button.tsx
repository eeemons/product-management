import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="
        w-full 
        bg-rich-black 
        text-white 
        p-2 
        rounded-md 
        transition-all 
        duration-300 
        ease-in-out 
        hover:bg-[#16263a] 
        hover:scale-[1.02] 
        active:scale-[0.98] 
        shadow-md 
        hover:shadow-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-[#16263a]
      "
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
