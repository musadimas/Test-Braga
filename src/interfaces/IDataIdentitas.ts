export interface IDataIdentitas<x> {
  terikat_kontrak: string | null;
  nama_lengkap: string | null;
  nik: string | null;
  jenis_kelamin: string | null;
  status_perkawinan: string | null;
  tanggal_lahir?: string | null;
  minat: string | null;
  dinas_teknis: string | null;
  kabkot: string | null;
  kecamatan: string | null;
  deskel: string | null;
  dukungan: Iterable<x>;
}
