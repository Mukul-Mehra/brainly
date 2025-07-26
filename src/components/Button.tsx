export interface ButtonProps {
    variant : "primary"| "secondry",
    size : "sm"|"md"| "lg",
    text : string,
    startIcon ? : any,
    endIcon ?: any,
    onClick : () => void 
}
const variantStyles = {
    "primary" : "bg-[#5046E4] text-white ",
    "secondry" : "bg-[#E1E6FF] text-[#5046E4] "
}
const variantSize = {
    "sm" : "px-2 py-1",
    "md" : "px-4 py-2",
    "lg" : "px-6 py-3" 
}
const defaultStyle  = "rounded-md cursor-pointer flex "

export const Button = (props : ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${variantSize[props.size]} ${defaultStyle} `}>
      {props.startIcon ? <div className="pr-1.5"> {props.startIcon}</div> : null}  {props.text} {props.endIcon}
    </button>
}