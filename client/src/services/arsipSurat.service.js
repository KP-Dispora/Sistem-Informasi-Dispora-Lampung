import axios from "axios";
const API_URL = "http://localhost:8000/arsip_surat/";

// Akun Admin
const getDataAdmin = () => {
	return axios.get(API_URL + "get_data_admin", {withCredentials: true});
}

// Surat Masuk
const getDataSuratMasuk = () => {
	return axios.get(API_URL + "get_data_suratMasuk");
}

const tambahSuratMasuk = (tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, filePdf, operator) => {
	return axios.post(API_URL + "tambah_suratMasuk",
	 {tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, filePdf, operator},
	 {withCredentials: true}
	);
}

const deleteSuratMasuk = (id) => {
	return axios.delete(API_URL + `delete_suratMasuk/${id}`, {withCredentials: true}  )
}

const getDataSuratById = (id) => {
	 return axios.get(API_URL + `get_data_byId_suratMasuk/${id}`)
}

const editSuratMasuk = (id, tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, filePdf, operator) => {
	 return axios.put(API_URL + `update_suratMasuk/${id}`,
	 	{tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, pengirim, perihal, filePdf, operator}, 
	 	{withCredentials: true}
	 );
}

// Surat Keluar
const getDataSuratKeluar = () => {
	return axios.get(API_URL + "get_data_suratKeluar");
}

const tambahSuratKeluar = (tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, kepada, perihal, filePdf, operator) => {
	return axios.post(API_URL + "tambah_suratKeluar",
	 {tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, kepada, perihal, filePdf, operator},
	 {withCredentials: true}
	);
}

const deleteSuratKeluar = (id) => {
	return axios.delete(API_URL + `delete_suratKeluar/${id}`, {withCredentials: true}  )
}

const getDataSuratKeluarById = (id) => {
	 return axios.get(API_URL + `get_data_byId_suratKeluar/${id}`)
}

const editSuratKeluar = (id, tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, kepada, perihal, filePdf, operator) => {
	 return axios.put(API_URL + `update_suratKeluar/${id}`,
	 	{tanggalMasuk, kodeSurat, nomorSurat, tanggalSurat, kepada, perihal, filePdf, operator}, 
	 	{withCredentials: true}
	 );
} 

export default {
  getDataAdmin,
  getDataSuratMasuk,
  tambahSuratMasuk,
  getDataSuratById,
  deleteSuratMasuk,
  editSuratMasuk,
  getDataSuratKeluar,
  tambahSuratKeluar,
  getDataSuratKeluarById,
  deleteSuratKeluar,
  editSuratKeluar,
};