import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondry";
  text: string;
  beforeIcon?: ReactElement;
  onClick? : ()=>void;
  fullWidth? : boolean
}

const variantClasses = {
  primary: "text-[#5046E2] bg-[#E0E7FF]",
  secondry: "text-[#E0E7FF] bg-[#5046E2]",
};

const defaultStyles = "px-4 py-2 rounded-md items-center gap-2 cursor-pointer flex items-center";
const fullWidthCSS = "w-56 justify-center hover:bg-[#E0E7FF] hover:text-[#5046E2] transition-all duration-100 font-medium "

export function Button(props: ButtonProps) {
  const { variant, text, beforeIcon,onClick,fullWidth } = props;

  return (
    <button onClick={onClick} className={`${variantClasses[variant]} ${defaultStyles} 
    ${fullWidth ? fullWidthCSS : "" } ` }>
      {beforeIcon && <span>{beforeIcon}</span>}
      {text}
    </button>
  );
}
