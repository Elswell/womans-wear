import React from "react";
import { cls } from "../util/cls";

const classes = {
  base: "focus:outline-none transition ease-in-out duration-100 transition-all",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "px-8 py-2",
    large: "px-12 py-3 ",
    xLarge: "px-16 py-4",
    full: "w-full py-3",
    fixed220: "w-[220px] py-4",
  },
  variant: {
    primary:
      "bg-transparent border-2 border-black text-black font-semibold hover:bg-black hover:text-white  hover:border-black",
    secondary:
      "bg-transparent border-[1px] border-myGreen rounded-3xl font-bold hover:bg-myGreen",
    black: "bg-black text-white text-sm font-medium uppercase hover:bg-primary",
    gray: "bg-[#F0F2F2] text-myDarkGray uppercase border-2 border-myDarkGray hover:border-myGray hover:text-myGray",
  },
};

export const Button = ({
  children,
  type = "button",
  size = "large",
  variant = "primary",
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cls(
        `${classes.base} ${classes.size[size]} ${classes.variant[variant]} ${className}`
      )}
    >
      {children}
    </button>
  );
};
