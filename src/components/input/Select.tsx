import clsx from "clsx";
import {  useState } from "react";

interface ISelect{
  id:string
  label:string
  selected:string|null
  placeholder:string
  data?:{id:string, value:string}[]
  loading:boolean
  disabled?:boolean
  onChange:(value:string)=>void
}


export function Select({id,label, selected, placeholder, loading, data, onChange, disabled}:ISelect){
  const [toggle, setToggle] = useState<boolean>(false)
return(
  <div className='flex flex-col space-y-3 ' id={id}>
  <h1 className='font-semibold text-sm'>
    {label}<span className='text-red-500'>*</span>
  </h1>
  <div className="relative">
    <button
    disabled={disabled}
      type='button'
      onClick={() => setToggle((current) => (current === true ? false : true))}
      className={clsx([' text-xs z-0 w-full flex items-center justify-between cursor-pointer rounded-lg bg-white py-2 px-4 h-10 border text-left outline-green-500', {"bg-[#EAEAEA] text-[#828282]":disabled}])}
    >
      {selected === null ? placeholder : selected}
      <img src='/icons/arrow-down.svg' alt='Dropdown Icon' />
    </button>
    <div className={clsx(["z-50 border rounded-md w-full bg-white overflow-y-auto h-52", { "absolute top-11": toggle, hidden: !toggle }])}>
      {!loading &&
        data &&
        data.map((item, i) => (
          <div
          id={item.id}
            key={i}
            className={clsx(['text-xs cursor-pointer px-4 py-2 h-10 hover:bg-[#429257]/[.6] bg-origin-content rounded-md hover:border-[#429257]/[.6]', {"border border-[#429257]/[.6]":selected===item.value}])}
            onClick={() => {
              onChange(item.value);
              setToggle((current) => (current === true ? false : true));
            }}
          >
            {item.value}
          </div>
        ))}
    </div>
  </div>
</div>
)
}