import { ChangeEvent, EventHandler, FC, HTMLInputTypeAttribute, KeyboardEvent, KeyboardEventHandler } from "react";

interface IText {
  id: string;
  label: string;
  placeholder: string;
  value: string | number | null;
  maxLength?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type: HTMLInputTypeAttribute;
  minLength?: number;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const Text: FC<IText> = ({ id, label, placeholder, value, onChange, required, maxLength, type, onKeyPress, minLength }) => {
  return (
    <div className='flex flex-col space-y-3'>
      <label htmlFor={id} className='text-sm font-semibold'>
        {label}
        {required && <span className='text-[#F81515]'>*</span>}
      </label>
      <input
        onKeyPress={onKeyPress}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        type={type}
        className='h-10 px-5 border rounded-md outline-green-500'
        placeholder={placeholder}
        value={value ? value : ""}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
