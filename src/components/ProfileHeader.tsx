import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface IProfileHeader {
  nama?: string;
  nik?: string;
}

export const ProfileHeader: FC<IProfileHeader> = ({ nama, nik }) => {
  const navigate = useNavigate();
  return (
    <div className='w-full bg-[#E9F5ED] rounded-2xl p-5 flex items-center gap-10 relative mb-5'>
      <img src='/icons/profile-accent.svg' alt='Accent' className='absolute right-0' />
      <img src='/img/profile.png' alt='Profile Picture' className='max-h-[116px] rounded-md object-cover' />
      <div className=''>
        <h1 className='text-2xl font-semibold'>{nama}</h1>
        <p className='text-base mb-2'>{nik}</p>
        {location.pathname === "/dashboard/admin/profile-petmil" && <Button type='button' color='primary' label='Lihat Data Sebelum Ajuan' onClick={() => navigate("/dashboard/admin/profile-petmil-sebelum")} />}
        {location.pathname === "/dashboard/admin/profile-petmil-sebelum" && <Button type='button' color='primary' label='Lihat Data Setelah Ajuan' onClick={() => navigate("/dashboard/admin/profile-petmil")} />}
      </div>
    </div>
  );
};
