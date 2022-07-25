import clsx from "clsx";
import { ChangeEvent, FC } from "react";

interface IRadio {
  label?: string;
  id: string;
  checked: boolean;
  value: string | undefined | null;
  condition: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Radio: FC<IRadio> = ({ label, id, checked, value, onChange, condition }) => {
  return (
    <label className='flex items-center gap-2 text-xs'>
      <input id={id} type='checkbox' className='appearance-none' checked={checked} value={value ? value : ""} onChange={onChange} />
      <span className={clsx(["rounded-full border h-4 w-4 cursor-pointer drop-shadow-md", { "border-4 border-[#067857]": condition === value }])} />
      {label}
    </label>
  );
};
