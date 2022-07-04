import React from "react";
import AuthService from "../services/authAdminArsipSurat.service";


const DashboardAdminArsipSurat = () => {
  const currentUser = AuthService.whoami();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Ini dashboard admin arsip Surat</strong> 
        </h3>
      </header>
      <p>
        <strong>Username:</strong> {currentUser.username}
      </p>
      
    </div>
  );
};
export default DashboardAdminArsipSurat;