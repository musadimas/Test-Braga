import { FC } from "react";
import { IDataIdentitas, IDukungan } from "../interfaces";

interface IProfileData {
  data: IDataIdentitas<IDukungan[]> | null;
  dukungan: Array<string[]>;
}

export const ProfileData: FC<IProfileData> = ({ data, dukungan }) => {
  return (
    <>
      {data ? (
        <div className='grid grid-cols-3'>
          <div className='px-5 '>
            {data &&
              Object.entries(data).map((item, i) =>
                item[0] === "dukungan" ? null : (
                  <div className='grid grid-cols-2 mb-4' key={i}>
                    {item[0] === "terikat_kontrak" ? (
                      <h3 className='text-base font-semibold'>Terikat Kontrak</h3>
                    ) : item[0] === "nama_lengkap" ? (
                      <h3 className='text-base font-semibold'>Nama Lengkap</h3>
                    ) : item[0] === "jenis_kelamin" ? (
                      <h3 className='text-base font-semibold'>Jenis Kelamin</h3>
                    ) : item[0] === "status_perkawinan" ? (
                      <h3 className='text-base font-semibold'>Status Perkawinan</h3>
                    ) : item[0] === "minat" ? (
                      <h3 className='text-base font-semibold'>Minat</h3>
                    ) : item[0] === "dinas_teknis" ? (
                      <h3 className='text-base font-semibold'>Dinas Teknis</h3>
                    ) : item[0] === "kabkot" ? (
                      <h3 className='text-base font-semibold'>Kabupaten/Kota</h3>
                    ) : item[0] === "kecamatan" ? (
                      <h3 className='text-base font-semibold'>Kecamatan</h3>
                    ) : item[0] === "deskel" ? (
                      <h3 className='text-base font-semibold'>Desa/Kelurahan</h3>
                    ) : item[0] === "tanggal_lahir" ? (
                      <h3 className='text-base font-semibold'>Tanggal Lahir</h3>
                    ) : item[0] === "nik" ? (
                      <h3 className='text-base font-semibold'>NIK</h3>
                    ) : null}
                    <p className='text-base ml-5'>{item[1]}</p>
                  </div>
                )
              )}
          </div>
          <div className='col-span-2 px-5'>
            <h3 className='text-base font-semibold '>Dukungan yang diharapkan</h3>
            {dukungan.map((item, i) => (
              <div key={i} className='flex items-start gap-2 space-y-2'>
                <img src='/icons/checklist.svg' alt='Checklist Icon' className='mt-3' />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <img src='/img/nodata.png' alt='No Data' className='w-full h-96 object-contain' />
        </div>
      )}
    </>
  );
};
