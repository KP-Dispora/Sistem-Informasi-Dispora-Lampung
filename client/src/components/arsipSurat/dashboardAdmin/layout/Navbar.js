import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../../services/authAdminArsipSurat.service";
import EventBus from "../../../../common/EventBus";
import '../../../../css/arsipSurat/navbarAndSidebarDashboard.css';

// Gambar
import logoLampung from "../../../../asset/image/arsipSurat/Logo_lampung.png";
import arsipDispora from "../../../../asset/image/arsipSurat/arsipDispora.png";
import iconnav1 from "../../../../asset/image/arsipSurat/icon/iconnav1.png";
import iconNavSuratMasuk from "../../../../asset/image/arsipSurat/icon/iconNavSuratMasuk.png";
import iconNavSuratKeluar from "../../../../asset/image/arsipSurat/icon/iconNavSuratKeluar.png";

function NavbarAdminArsipSurat({currentUserLogin ,children}) {

  const navigate = useNavigate();

  useEffect(() => { 

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    AuthService.logout();
    navigate("/login_admin_arsip_surat")
  };

  const sidebarToggle = (event) => {
    event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
  }

  return (
    <div className="d-flex" id="wrapper">
      {/*<!-- Sidebar-->*/}
      <div className="border-end bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading border-bottom">
            <img src={logoLampung} />
            <div className="cirle-bacground">
            <img src={arsipDispora} className="text-center mt-5 ms-1" />
            </div>
          </div>
          <div className="d-flex flex-column">
              <a className="sidebar-item text-center text-sidebar mb-3 mt-3 p-3 active-sidebar" href="#!">
                <img src={iconnav1}/> Dashboard
              </a>
              <a className="sidebar-item text-center text-sidebar mb-3 mt-3 p-3" href="#!">
                <img src={iconNavSuratMasuk}/> Surat Masuk
              </a>
              <a className="sidebar-item text-center text-sidebar mb-3 mt-3 p-3" href="#!">
                <img src={iconNavSuratKeluar}/> Surat Keluar
              </a>
          </div>
      </div>
      {/*<!-- Page content wrapper-->*/}
      <div id="page-content-wrapper">
          {/*<!-- Top navigation-->*/}
          <nav className="navbar navbar-expand-lg navbar-light border-bottom bg-custom-navbar p-3">
              <div className="container-fluid">
                  <button className="btn btn-primary" id="sidebarToggle" onClick={sidebarToggle}>Toggle Menu</button>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                          <li className="nav-item"><a className="nav-link active" href="#!">Home</a></li>
                          <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Nama Admin</a>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                  <a className="dropdown-item" href="#!">Action</a>
                                  <a className="dropdown-item" href="#!">Another action</a>
                                  <div className="dropdown-divider"></div>
                                  <a className="dropdown-item" href="#!">Something else here</a>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
          {/*<!-- Page content-->*/}
          <div className="container-fluid">
              <h1 className="mt-4">Simple Sidebar</h1>
              <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
              <p>
                  Make sure to keep all page content within the
                  <code>#page-content-wrapper</code>
                  . The top navbar is optional, and just for demonstration. Just create an element with the
                  <code>#sidebarToggle</code>
                  ID which will toggle the menu when clicked.
              </p>
              <main>{children}</main>
          </div>
      </div>
  </div>
     
  );
}

export default NavbarAdminArsipSurat;