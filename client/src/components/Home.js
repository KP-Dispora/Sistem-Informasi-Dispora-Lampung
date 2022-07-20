import React from 'react';

// Image
import gambarJumbotron from "../asset/image/kantor_dispora.png";

// Css
import '../css/home.css';

function Home() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Expand at md</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbars" aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbars">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled">Disabled</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                  <ul className="dropdown-menu" aria-labelledby="dropdown04">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <div className="jumbotron">
          <img className="img-fluid" src={gambarJumbotron}/>
        </div>

        <h1 className="text-center my-5"> Sistem Informasi Dispora </h1>

        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 gx-5 gy-5">
            <div className="col">
              <div className="card w-75 h-100 mx-auto">
                <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card w-75 h-100 mx-auto">
                <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-5 pt-4">
          <p className="text-center p-3 m-0 footer-home text-muted">&copy; 2022 Company, Inc</p>
        </footer>

      </div>
    )
}

export default Home;