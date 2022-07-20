import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
// Compponent Arsip Surat 
import LoginAdminArsipSurat from "./components/arsipSurat/dashboardAdmin/LoginAdminArsipSurat";
import DashboardAdminArsipSurat from "./components/arsipSurat/dashboardAdmin/DashboardAdminArsipSurat";
import SuratMasukPage from "./components/arsipSurat/dashboardAdmin/SuratMasukPage";
import TambahSuratMasukPage from "./components/arsipSurat/dashboardAdmin/TambahSuratMasukPage";
import DetailSuratMasuk from "./components/arsipSurat/dashboardAdmin/DetailSuratMasuk";
import EditSuratMasuk from "./components/arsipSurat/dashboardAdmin/EditSuratMasuk";
import SuratKeluarPage from "./components/arsipSurat/dashboardAdmin/SuratKeluarPage";
import TambahSuratKeluarPage from "./components/arsipSurat/dashboardAdmin/TambahSuratKeluarPage";
import DetailSuratKeluar from "./components/arsipSurat/dashboardAdmin/DetailSuratKeluar";
//Home
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route exact path={"/home"} element={<Home />} />
      <Route exact path="/login_admin_arsip_surat" element={<LoginAdminArsipSurat />} />
      <Route exact path="/dashboard_admin_arsip_surat" element={<DashboardAdminArsipSurat />} />
      <Route exact path="/admin_surat_masuk" element={<SuratMasukPage />} />
      <Route exact path="/admin_surat_masuk/tambah" element={<TambahSuratMasukPage />} />
      <Route exact path="/admin_surat_masuk/detail/:id" element={<DetailSuratMasuk />} />
      <Route exact path="/admin_surat_masuk/edit/:id" element={<EditSuratMasuk />} />
      <Route exact path="/admin_surat_keluar" element={<SuratKeluarPage />} />
      <Route exact path="/admin_surat_keluar/tambah" element={<TambahSuratKeluarPage />} />
      <Route exact path="/admin_surat_keluar/detail/:id" element={<DetailSuratKeluar />} />
    </Routes>
  );
}

export default App;
