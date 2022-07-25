import { FC, FormEvent, FormEventHandler, MouseEvent } from "react";
import clsx from "clsx";

interface IButton {
  label?: string;
  onClick?: (e: MouseEvent<HTMLElement> | FormEvent<HTMLButtonElement>) => void;
  color: string;
  className?: string;
  type: "button" | "submit" | "reset";
}

export const Button: FC<IButton> = ({ label, onClick, color, className, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(["min-w-[160px] py-2 px-4 text-sm rounded transition-colors font-medium text-white", className, { "bg-[#429257] hover:bg-[#51b16b]": color === "primary", "bg-red-500 hover:bg-red-400": color === "danger" }])}
    >
      {label}
    </button>
  );
};
