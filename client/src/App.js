import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
// Compponent Arsip Surat 
import LoginAdminArsipSurat from "./components/arsipSurat/dashboardAdmin/LoginAdminArsipSurat";
import DashboardAdminArsipSurat from "./components/arsipSurat/dashboardAdmin/DashboardAdminArsipSurat";
//Home
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route exact path={"/home"} element={<Home />} />
      <Route exact path="/login_admin_arsip_surat" element={<LoginAdminArsipSurat />} />
      <Route exact path="/dashboard_admin_arsip_surat" element={<DashboardAdminArsipSurat />} />
    </Routes>
  );
}

export default App;
