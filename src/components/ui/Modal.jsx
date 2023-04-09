import React from "react";
import { cls } from "../../util/cls";
import { AiFillCloseSquare, AiFillCheckSquare } from "react-icons/ai";
import { BsExclamationSquareFill } from "react-icons/bs";

const classes = {
  base: "fixed left-[100px] top-0 p-9 w-[470px] m-auto flex items-center space-x-2 transiton-all",
  variant: {
    success: "bg-[#E3FFE9] text-[#27AE60]",
    danger: "bg-[#FFE3E3] text-[#EB5757]",
    notification: "bg-[#E6F1FA] text-[#63A6DC]",
  },
  icon: {
    success: <AiFillCheckSquare />,
    danger: <AiFillCloseSquare />,
    notification: <BsExclamationSquareFill />,
  },
};

export const Modal = ({
  children,
  variant = "success",
  icon = "success",
  className,
}) => {
  return (
    <div
      className={cls(
        `${classes.base} ${classes.variant[variant]} ${className}`
      )}
    >
      {classes.icon[icon]} <span>{children}</span>
    </div>
  );
};
