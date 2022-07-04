import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AuthService from "./services/authAdminArsipSurat.service";
import LoginAdminArsipSurat from "./components/loginAdminArsipSurat";
import DashboardAdminArsipSurat from "./components/dashboardAdminArsipSurat";
import Home from "./components/Home";
import EventBus from "./common/EventBus";

function App() {

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    async function fetchDataUser() {
      return await AuthService.whoami()
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          // console.log(error.response.status) // 401
          if(error.response.status==401){
             setCurrentUser(undefined);
          }
          return error.response.status;
        });
    }
    
    fetchDataUser();

    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/dashboard_admin_arsipSurat"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<LoginAdminArsipSurat />} />
          <Route exact path="/dashboard_admin_arsipSurat" element={<DashboardAdminArsipSurat />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
