import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/authAdminArsipSurat.service";
import Navbar from './layout/Navbar';

const DashboardAdminArsipSurat = () => {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    AuthService.whoami()
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((error) => {
        if(error.response.status === 401){
           setCurrentUser(undefined);
           navigate("/login_admin_arsip_surat")
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
    <div>
    {currentUser && 
      <Navbar currentUserLogin={currentUser}>
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Ini dashboard admin arsip Surat</strong> 
          </h3>
        </header>
      </div>
    </Navbar>
    }
    </div>
      
  );
};
export default DashboardAdminArsipSurat;