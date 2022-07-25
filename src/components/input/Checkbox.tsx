import { ChangeEvent, FC } from "react";
import { IDukungan } from "../../interfaces";

interface ICheckbox {
  id: string;
  title: string;
  data: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selected: Iterable<IDukungan[] | string>;
}

export const Checkbox: FC<ICheckbox> = ({ id, title, data, selected, onChange }) => {
  function findData(value: string) {
    const data = selected as string[];
    return data.find((x) => x === value);
  }
  return (
    <div className='space-y-3'>
      <h1 className='text-sm font-semibold'>{title}</h1>
      <div className='space-y-3'>
        {data.map((item, i) => (
          <div className='flex items-start gap-2' key={i}>
            <input id={id} type='checkbox' className='accent-[#449067] cursor-pointer min-w-[18px] h-[18px] mt-[0.5]' value={item} checked={findData(item) ? true : false} onChange={onChange} />
            <label htmlFor='id' className='text-xs'>
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
