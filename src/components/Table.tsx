import { FC, MouseEvent, useState } from "react";
import { FaSort } from "react-icons/fa";
import { BsThreeDotsVertical, BsEye } from "react-icons/bs";
import { IDataIdentitas, IDukungan } from "../interfaces";
import clsx from "clsx";

interface ITable {
  data: IDataIdentitas<IDukungan>[];
  head: { title: string }[];
  onClick: (event: MouseEvent<HTMLTableCellElement | HTMLButtonElement>) => void;
}

function Sort() {
  return <FaSort className='text-[rgba(35,34,33,0.1)] hover:text-[#232221] transition-opacity cursor-pointer' />;
}

export const Table: FC<ITable> = ({ data, head, onClick }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='border rounded-md overflow-x-scroll relative overflow-y-hidden'>
      <table className='border-collapse rounded-md bg-[#FBFBFA] drop-shadow-md w-full overflow-x-scroll '>
        <thead className='border-b rounded-t-md '>
          <tr>
            {head?.map((col, i) => (
              <th className=' px-4 py-2 text-left min-w-[200px] select-none' key={i}>
                <div className='flex items-center justify-between font-medium'>
                  {col?.title}
                  <Sort />
                </div>
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr key={i} className='odd:bg-white even:bg-inherit cursor-pointer select-none'>
              <td className='px-4 py-2' onClick={onClick}>
                {row?.nik}
              </td>
              <td className='px-4 py-2' onClick={onClick}>
                {row?.nama_lengkap}
              </td>
              <td className='px-4 py-2' onClick={onClick}>
                {row?.minat}
              </td>
              <td className='px-4 py-2' onClick={onClick}>
                {row?.dinas_teknis}
              </td>
              <td className='px-4 py-2' onClick={onClick}>
                lorem
              </td>
              <td className='px-4 py-2' onClick={onClick}>
                {row?.tanggal_lahir}
              </td>
              <td className='px-4 py-2' onClick={onClick}>
                {row?.kabkot}
              </td>
              <td className='px-4 py-2' onClick={onClick}>
                {row?.kecamatan}
              </td>
              <td className='px-4 py-2' onClick={onClick}>
                {row?.deskel}
              </td>
              <td className='px-4 py-2 relative' onClick={() => setToggle(toggle ? false : true)}>
                <BsThreeDotsVertical />
                <button className={clsx(["flex transition-all text-xs font-semibold items-center justify-around border p-2 top-1 right-2/3 w-40 bg-[#a4d7c9] select-none", { absolute: toggle, hidden: !toggle }])} onClick={onClick}>
                  <BsEye className='text-base' /> Lihat Detail Data
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
