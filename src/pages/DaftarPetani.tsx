import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../components";
import { TableHeader } from "../constant";
import { IDataIdentitas, IDukungan } from "../interfaces";

export const DaftarPetani = () => {
  const navigate = useNavigate();
  const [petmil, setPetmil] = useState<IDataIdentitas<IDukungan>[]>([]);

  useEffect(() => {
    const currentData = localStorage.getItem("petmil-identitas-sekarang");
    if (currentData) {
      const parseData = JSON.parse(currentData);
      setPetmil((prev) => [parseData]);
    }
    return;
  }, []);
  return (
    <div>
      <div className='m-10'>
        <h1 className='mb-5 font-semibold text-2xl'>Daftar Pengajuan Petmil</h1>
        <Table data={petmil} head={TableHeader} onClick={() => navigate("/dashboard/admin/profile-petmil")} />
      </div>
    </div>
  );
};
