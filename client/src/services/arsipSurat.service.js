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

// Surat Keluar
const getDataSuratKeluar = () => {
	return axios.get(API_URL + "get_data_suratKeluar");
} 

export default {
  getDataAdmin,
  getDataSuratMasuk,
  getDataSuratKeluar,
};