import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProfileData, ProfileHeader } from "../components";
import { IDataIdentitas, IDukungan } from "../interfaces";

export const Profile = () => {
  const location = useLocation();
  const [petmil, setPetmil] = useState<IDataIdentitas<IDukungan[]> | null>(null);
  const [petmilIdentitas, setPetmilIdentitas] = useState<{ [key: string]: string } | null>(null);
  const [pilihanDukungan, setPilihanDukungan] = useState<Array<string[]>>([]);

  useEffect(() => {
    if (location.pathname === "/dashboard/admin/profile-petmil") {
      const currentData = localStorage.getItem("petmil-identitas-sekarang");
      if (currentData) {
        const parseData = JSON.parse(currentData);
        setPetmil(parseData);
        setPilihanDukungan([...parseData.dukungan]);
        setPetmilIdentitas({ nama_lengkap: parseData.nama_lengkap, nik: parseData.nik });
      }
      if (!currentData) {
        setPetmil(null);
        setPetmilIdentitas(null);
      }
    }
    if (location.pathname === "/dashboard/admin/profile-petmil-sebelum") {
      const prevData = localStorage.getItem("petmil-identitas-sebelum");
      if (prevData) {
        const parseData = JSON.parse(prevData);
        setPetmil(parseData);
        setPilihanDukungan([...parseData.dukungan]);
      }
      if (!prevData) {
        setPetmil(null);
      }
    }
    return;
  }, [location.pathname]);
  return (
    <div className='mx-20 mt-5'>
      <ProfileHeader nama={petmilIdentitas?.nama_lengkap} nik={petmilIdentitas?.nik} />
      <ProfileData data={petmil} dukungan={pilihanDukungan} />
    </div>
  );
};
