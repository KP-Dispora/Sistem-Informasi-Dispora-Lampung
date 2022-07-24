import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AuthService from "../../../services/authAdminProposal.service";
import ProposalService from "../../../services/proposal.service";
import Navbar from './layout/Navbar';

import Swal from 'sweetalert2';

// Form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';

// Firebase
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

// Firebase Config
import storage from "../../../common/firebaseConfig.js"

// Icon
import { ArrowRight, ClipboardCheckFill } from 'react-bootstrap-icons';

// Css
import '../../../css/arsipSurat/tambahEditSurat.css';


function EditProfilAdminPage() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [dataAdmin, setDataAdmin] = useState(undefined);
    const [foto, setFoto] = useState(undefined);
    const allowedFiles = ['image/gif', "image/jpeg", "image/png"];
    const [percent, setPercent] = useState(0);
    // pdf file error state
    const [fotoError, setFotoError]=useState('');

    useEffect(() => {
      AuthService.whoami()
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          if(error.response.status === 401){
             setCurrentUser(undefined);
             navigate("/login_admin_proposal")
          }
        });

      ProposalService.getDataAdmin()
          .then((response) => {
            setDataAdmin(response.data[0]);
          })

        
    }, [navigate]);

    //--------------Form Validation-----------------//
    const validationSchema = Yup.object().shape({
      namaAdmin: Yup.string().required("Nama Admin Tidak Boleh Kosong"),
      username: Yup.string().required("Username Tidak Boleh Kosong"),
    });

    const formik = useFormik({
      initialValues: {
        namaAdmin: `${ dataAdmin ? dataAdmin.nama_admin : "" }`,
        username: `${ dataAdmin ? dataAdmin.username : "" }`,
        password: "",
        foto: "",
      },
      enableReinitialize: true,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (data) => {
        setLoading(true);

        if(foto){

          if(foto&&allowedFiles.includes(foto.type)){
            const storageRef = ref(storage, `/foto_admin_proposal/${foto.name}`+ new Date().getTime())
            const uploadTask = uploadBytesResumable(storageRef, foto);

            const fotoRef = ref(storage, dataAdmin.foto);
            deleteObject(fotoRef);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
         
                    // update progress
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                        await ProposalService.updateProfileAdmin(
                          id,
                          data.namaAdmin,
                          data.username,
                          data.password,
                          data.foto,
                        )
                          .then(()=>{
                            setLoading(false);
                            setFotoError('');
                            Swal.fire(
                              'Profil Admin Berhasil Diedit',
                              'success'
                            )
                            navigate("/dashboard_admin_proposal");
                          })
                          .catch(()=>{
                            setLoading(false);
                            setFotoError('');
                          })
                    });
                }
            ); 
          
          }
          else{
            setFotoError('File Yang Dicantumkan Harus Gambar');
            setLoading(false);
          }
        }
        else{
          await ProposalService.updateProfileAdmin(
            id,
            data.namaAdmin,
            data.username,
            data.password,
            data.foto,
          )
            .then(()=>{
              setLoading(false);
              setFotoError('');
              Swal.fire(
                'Profil Admin Berhasil Diedit',
                'success'
              )
              navigate("/dashboard_admin_proposal");
            })
            .catch((err)=>{
              console.log(err)
              setLoading(false);
              setFotoError('');
            })
          setLoading(false); 
        }      

      },
    });

    //-----------------------------------------------------//

    const onChangeFoto = (e) => {
      const selectedFile = e.target.files[0];

      if(selectedFile){
        if(selectedFile&&allowedFiles.includes(selectedFile.type)){
          setFoto(e.target.files[0]);
          setFotoError('');   
        }
        else{
          setFotoError('File Yang Dicantumkan Harus Gambar');
          setFoto('');
        }
      }

    };       

    return (
      <div>
        {currentUser &&

        <Navbar currentUserLogin={currentUser}>
          <h1 className="my-4 text-center text-judul-surat-page">Edit Profil Admin</h1>
          <div className="container bg-form text-font-surat-page">
            <div className="mx-auto">
              <form className="mx-auto px-4" onSubmit={formik.handleSubmit}>
                <div className="d-flex align-items-center pt-3">
                  <Link className="breadcum-surat-active" to={"/profil_admin_proposal"}> <span>Profil Admin</span> </Link>
                    <span className="mx-2"><ArrowRight/></span>
                  <span className="breadcum-surat">Edit Profil Admin </span>
                </div>
                
                <hr className="py-1"/>

                <div className="row mb-3">
                  <label forhtml="namaAdmin" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Nama Admin:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="namaAdmin"
                      value={formik.values.namaAdmin}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.namaAdmin ? formik.errors.namaAdmin : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="username" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Username:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.username ? formik.errors.username : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="password" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Password:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <span className="form-text">
                      *Kosongkan jika tidak ingin mengubah foto
                    </span>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="foto" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Upload Foto Baru:</label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <input 
                        className="form-control" 
                        type="file" 
                        name="foto"
                        id="foto"
                        onChange={onChangeFoto}
                      />
                    </div>
                    {fotoError&&<div className='text-danger'>{fotoError}</div>}
                    <span className="form-text">
                      *Kosongkan jika tidak ingin mengubah foto
                    </span>
                  </div>
                </div>

                <div className="row">
                  <label forhtml="foto" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Foto Lama:</label>
                  <div className="col-sm-10">
                    <img className="img-fluid" src={dataAdmin && dataAdmin.foto} alt="Tidak Ada Gambar" /> 
                  </div>
                </div>

                <div className="text-center">
                  <hr/>
                  <Link to={"/admin_surat_masuk"} className="btn btn-kembali-surat mb-4">
                    {"<"} Kembali
                  </Link>
                  <button type="submit" className="btn mb-4 btn-surat mx-4" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span><ClipboardCheckFill/> Simpan</span>
                  </button>
                  <p>{percent == 0 ? null: `${percent}% selesai`}</p>
                </div>
              </form>
            </div>
          </div>
          
        </Navbar>

        }
      </div>
    )
}

export default EditProfilAdminPage;