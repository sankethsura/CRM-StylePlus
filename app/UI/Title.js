import React from "react";
import { twMerge } from "tailwind-merge";

export default function Title({ children, className, ...rest }) {
  const twMergeResult = twMerge(
    "text-xl font-medium text-customColorWhite",
    className
  );
  return (
    <div className={twMergeResult} {...rest}>
      {children}
    </div>
  );
}
