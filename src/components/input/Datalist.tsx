import { ChangeEvent } from "react";

interface IDatalist {
  id?: string;
  label?: string;
  selected?: string | null;
  placeholder?: string;
  data?: { id: string; value: string }[];
  loading?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export function Datalist({ id, label, placeholder, loading, data, onChange, disabled, value }: IDatalist) {
  return (
    <div className='flex flex-col space-y-3 ' id={id}>
      <h1 className='font-semibold text-sm'>
        {label}
        <span className='text-red-500'>*</span>
      </h1>
      <div className='relative w-full'>
        <input type='text' id={id} placeholder={placeholder} list={`${id}-list`} className=' text-xs w-full px-4 h-10 border rounded-md outline-green-500' value={value} onChange={onChange} />
        <datalist role={"listbox"} id={`${id}-list`} className=''>
          {!loading && data && data.map((item, i) => <option key={i} value={item.value} />)}
        </datalist>
      </div>
    </div>
  );
}
