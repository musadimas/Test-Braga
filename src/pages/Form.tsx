import clsx from "clsx";
import { ChangeEvent, FC, FormEvent, MouseEvent, SetStateAction, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Radio, Text, Select, Datalist, Checkbox } from "../components/input";
import { IDataIdentitas, IDukungan } from "../interfaces";
import { Button } from "../components/Button";
import API_URL from "../constant/API_URL";
import dummy from "../constant/DummyData";

export const Form: FC = () => {
  const [form, setForm] = useState<IDataIdentitas<string | IDukungan[]>>({
    terikat_kontrak: "Tidak",
    nama_lengkap: null,
    nik: null,
    jenis_kelamin: null,
    status_perkawinan: null,
    tanggal_lahir: null,
    minat: null,
    dinas_teknis: null,
    kabkot: null,
    kecamatan: null,
    deskel: null,
    dukungan: [],
  });
  const [formError, setFormError] = useState<{ [key: string]: any } | null>({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { data: kabkotData, isLoading: kabkotLoading } = useFetch(API_URL.KABKOT);
  const { data: kecamatanData, isLoading: kecamatanLoading } = useFetch(API_URL.KECAMATAN);
  const { data: deskelData, isLoading: deskelLoading } = useFetch(API_URL.DESKEL);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    const checked = e.target.checked;
    const dukunganArr = form.dukungan as Array<any>;
    if (id === "dukungan") {
      if (checked === true) {
        setForm({ ...form, dukungan: [...form.dukungan, value] });
      }
      if (checked === false) {
        setForm({ ...form, dukungan: dukunganArr.filter((data) => data !== value) });
      }
    } else {
      setForm({ ...form, [id]: value });
    }
  }

  const kabkotSelector = kabkotData?.map((lokasi) => {
    return { id: lokasi.id, value: lokasi.nama_kota };
  });

  const kecamatanSelector = () => {
    if (form.kabkot) {
      const findKota = kabkotData?.find((x) => x.nama_kota === form.kabkot);
      const filterData = kecamatanData?.filter((x) => findKota.id === x.id_kabkot);
      return filterData?.map((lokasi) => {
        return { id: lokasi.id, value: lokasi.nama_kecamatan };
      });
    }
    return kecamatanData?.map((lokasi) => {
      return { id: lokasi.id, value: lokasi.nama_kecamatan };
    });
  };

  const deskelSelector = () => {
    if (form.kecamatan) {
      const findKecamatan = kecamatanData?.find((x) => x.nama_kecamatan === form.kecamatan);
      const filterKecamatan = kecamatanData?.filter((x) => x.nama_kecamatan === form.kecamatan);
      if (!findKecamatan) {
        return;
      }
      const filterData = deskelData?.filter((x) => filterKecamatan?.[0].id === x.id_kecamatan);
      filterData?.map((lokasi) => {
        return { id: lokasi.id, value: lokasi.nama_deskel };
      });
    }
    return deskelData?.map((lokasi) => {
      return { id: lokasi.id, value: lokasi.nama_deskel };
    });
  };

  function validate() {
    const error: { [key: string]: string } = {};
    if (form.terikat_kontrak === null || "") {
      return { terikat_kontrak: "Harap masukan pilihan." };
    }
    if (form.nama_lengkap === null || "") {
      return { nama_lengkap: "Harap isi nama lengkap anda." };
    }
    if (form.nik === null || "") {
      return {
        nik: "Harap isi NIK anda.",
      };
    }
    if (form.jenis_kelamin === null || "") {
      return {
        jenis_kelamin: "Harap masukan pilihan.",
      };
    }
    if (form.status_perkawinan === null || "") {
      return {
        status_perkawinan: "Harap masukan pilihan.",
      };
    }
    if (form.tanggal_lahir === null || "") {
      return {
        tanggal_lahir: "Harap masukan tanggal",
      };
    }
    if (form.minat === null || "") {
      return {
        minat: "Harap masukan pilihan.",
      };
    }
    if (form.dinas_teknis === null || "") {
      return {
        dinas_teknis: "Harap masukan pilihan.",
      };
    }
    if (form.kabkot === null || "") {
      return {
        kabkot: "Harap masukan pilihan.",
      };
    }
    if (form.kecamatan === null || "") {
      return {
        kecamatan: "Harap masukan pilihan.",
      };
    }
    if (form.deskel === null || "") {
      return {
        deskel: "Harap masukan pilihan.",
      };
    }
    if (JSON.stringify(form.dukungan) === "[]") {
      return {
        dukungan: "Harap masukan pilihan.",
      };
    }
    return null;
  }

  const handleSubmit = (e: MouseEvent<HTMLElement> | FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    validate();
    setFormError(validate() as SetStateAction<{ [key: string]: string } | null>);
    const currentData = localStorage.getItem("petmil-identitas-sekarang");
    if (!validate()) {
      e.stopPropagation();
      alert("Data telah disimpan");
      if (currentData) {
        localStorage.setItem("petmil-identitas-sebelum", currentData);
        console.log(localStorage.getItem("petmil-identitas-sebelum"));
        localStorage.setItem("petmil-identitas-sekarang", JSON.stringify(form));
      }
      localStorage.setItem("petmil-identitas-sekarang", JSON.stringify(form));
    }
  };

  useEffect(() => {
    kecamatanSelector();
    return () => {};
  }, [form.kabkot]);

  useEffect(() => {
    deskelSelector();
    return () => {};
  }, [form.kecamatan]);

  useEffect(() => {
    const currentData = localStorage.getItem("petmil-identitas-sekarang");
    if (currentData) {
      const parseData = JSON.parse(currentData);
      setForm(parseData);
    }
    return;
  }, []);

  return (
    <form className='mx-40 my-10 space-y-5'>
      <div className='space-y-3 '>
        <h1 className='mb-2 text-sm font-semibold'>
          Apakah saat ini Anda sedang terikat kontrak dengan institusi pekerjaan tertentu?<span className='text-red-500'>*</span>
        </h1>
        <div className='flex gap-5'>
          <Radio id='terikat_kontrak' condition={form.terikat_kontrak} checked={form.terikat_kontrak === "Ya"} value='Ya' onChange={handleChange} label='Ya' />
          <Radio id='terikat_kontrak' condition={form.terikat_kontrak} checked={form.terikat_kontrak === "Tidak"} value='Tidak' onChange={handleChange} label='Tidak' />
        </div>
        {formError?.terikat_kontrak && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.terikat_kontrak}</p>}
      </div>
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <Text
            id='nama_lengkap'
            onKeyPress={(event) => {
              if (!/^[a-zA-Z ]*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
            type='text'
            label='Nama Lengkap'
            value={form.nama_lengkap}
            placeholder='Nama Lengkap Anda'
            onChange={handleChange}
          />
          {formError?.nama_lengkap && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.nama_lengkap}</p>}
        </div>
        <div>
          <Text
            id='nik'
            type='tel'
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            maxLength={16}
            minLength={16}
            label='Nomor Induk Kependudukan'
            value={form.nik}
            placeholder='NIK Anda'
            onChange={handleChange}
          />
          {formError?.nik && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.nik}</p>}
        </div>
      </div>
      <div className='grid grid-cols-3'>
        <div className='space-y-3 '>
          <h1 className='mb-2 text-sm font-semibold'>
            Jenis Kelamin<span className='text-red-500'>*</span>
          </h1>
          <div className='flex gap-5'>
            <Radio id='jenis_kelamin' condition={form.jenis_kelamin} checked={form.jenis_kelamin === "Laki-Laki"} value='Laki-Laki' onChange={handleChange} label='Laki-Laki' />
            <Radio id='jenis_kelamin' condition={form.jenis_kelamin} checked={form.jenis_kelamin === "Perempuan"} value='Perempuan' onChange={handleChange} label='Perempuan' />
          </div>
          {formError?.jenis_kelamin && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.jenis_kelamin}</p>}
        </div>
        <div className='space-y-3 col-span-2'>
          <h1 className='mb-2 text-sm font-semibold'>
            Status Perkawinan<span className='text-red-500'>*</span>
          </h1>
          <div className='flex gap-5'>
            <Radio id='status_perkawinan' condition={form.status_perkawinan} checked={form.status_perkawinan === "Sudah Menikah"} value='Sudah Menikah' onChange={handleChange} label='Sudah Menikah' />
            <Radio id='status_perkawinan' condition={form.status_perkawinan} checked={form.status_perkawinan === "Belum Menikah"} value='Belum Menikah' onChange={handleChange} label='Belum Menikah' />
          </div>
          {formError?.status_perkawinan && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.status_perkawinan}</p>}
        </div>
      </div>
      <div className='grid grid-cols-3 gap-5 '>
        <div className='space-y-2'>
          <label htmlFor='' className='text-sm font-semibold'>
            Tanggal Lahir<span className='text-red-500'>*</span>
          </label>
          <input id='tanggal_lahir' type='date' className='text-xs h-10 px-4 w-full border rounded-md outline-green-500' onChange={handleChange} value={form.tanggal_lahir ? form.tanggal_lahir : ""} />
          {formError?.tanggal_lahir && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.tanggal_lahir}</p>}
        </div>
        <div>
          <Select
            id='minat'
            data={dummy.minat}
            label='Minat'
            loading={false}
            placeholder='Minat'
            selected={form.minat}
            onChange={(data) => {
              setForm({ ...form, minat: data });
            }}
          />
          {formError?.minat && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.minat}</p>}
        </div>
        <div>
          <Select
            disabled={!form.minat && true}
            id='dinas_teknis'
            data={dummy.dinas}
            label='Dinas Teknis'
            loading={false}
            placeholder='Dinas Teknis'
            selected={form.dinas_teknis}
            onChange={(data) => {
              setForm({ ...form, dinas_teknis: data });
            }}
          />
          {formError?.dinas_teknis && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.dinas_teknis}</p>}
        </div>
      </div>
      <div className='grid grid-cols-3 gap-5'>
        <div>
          <Select
            id='kabkot'
            data={kabkotSelector}
            label='Kabupaten/Kota'
            loading={kabkotLoading}
            placeholder='Alamat Sesuai KTP'
            selected={form.kabkot}
            onChange={(data) => {
              setForm({ ...form, kabkot: data });
            }}
          />
          {formError?.kabkot && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.kabkot}</p>}
        </div>
        <div>
          <Select
            id='kecamatan'
            disabled={!form.kabkot && true}
            data={kecamatanSelector()}
            label='Kecamatan'
            loading={kecamatanLoading}
            placeholder='Alamat Domisili'
            selected={form.kecamatan}
            onChange={(data) => {
              setForm({ ...form, kecamatan: data });
            }}
          />
          {formError?.kecamatan && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.kecamatan}</p>}
        </div>
        <div>
          <Select
            id='deskel'
            disabled={!form.kecamatan && true}
            data={deskelSelector()}
            label='Kabupaten/Kota'
            loading={deskelLoading}
            placeholder='Alamat Sesuai KTP'
            selected={form.deskel}
            onChange={(data) => {
              setForm({ ...form, deskel: data });
            }}
          />
          {formError?.deskel && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.deskel}</p>}
        </div>
        {/* <Datalist id='kecamatan' placeholder='Alamat Domisili' label='Kecamatan' loading={kecamatanLoading} data={kecamatanSelector()} onChange={handleChange} value={form.kecamatan} />
        <Datalist id='deskel' placeholder='Alamat Domisili' label='Desa/Kelurahan' loading={deskelLoading} data={deskelSelector()} onChange={handleChange} value={form.deskel} /> */}
      </div>
      <div>
        <Checkbox id='dukungan' title='Dukungan yang diharapkan dari Program' data={dummy.dukungan} onChange={handleChange} selected={form.dukungan} />
        {formError?.dukungan && <p className='text-xs text-red-500 font-semibold mt-3'>{formError?.dukungan}</p>}
      </div>
      <div className='flex justify-center'>
        <Button type='submit' color='primary' label='Submit' onClick={handleSubmit} />
      </div>
    </form>
  );
};
