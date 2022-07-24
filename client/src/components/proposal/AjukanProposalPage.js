import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../../services/authAdminArsipSurat.service";
import ArsipSuratService from "../../../services/arsipSurat.service";
import Navbar from './layout/Navbar';

import Swal from 'sweetalert2';

// Form Validation
import { useFormik } from "formik";
import * as Yup from 'yup';

// Firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Firebase Config
import storage from "../../../common/firebaseConfig.js"

// Pdf Viewer
import PdfViewer from "./PdfView";

// Icon
import { ArrowRight, Download } from 'react-bootstrap-icons';

// Css
import '../../../css/arsipSurat/tambahEditSurat.css';

function TambahSuratMasukPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [filePdf, setFilePdf] = useState(undefined);
    const allowedFiles = ['application/pdf'];
    const [percent, setPercent] = useState(0);
    // pdf file error state
    const [pdfError, setPdfError]=useState('');

    //--------------Form Validation-----------------//
    const validationSchema = Yup.object().shape({
      tanggalMasuk: Yup.string().required("Tanggal Masuk Surat Tidak Boleh Kosong"),
      kodeSurat: Yup.string().required("Kode Surat Tidak Boleh Kosong"),
      nomorSurat: Yup.string().required("Nomor Surat Tidak Boleh Kosong"),
      tanggalSurat: Yup.string().required("Tanggal Surat Tidak Boleh Kosong"),
      pengirim: Yup.string().required("Pengirim Tidak Boleh Kosong"),
      perihal: Yup.string().required("Perihal Tidak Boleh Kosong"),
    });

    const formik = useFormik({
      initialValues: {
        tanggalMasuk: "",
        kodeSurat: "",
        nomorSurat: "",
        tanggalSurat: "",
        pengirim: "",
        perihal: "",
      },
      validationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (data) => {
        setLoading(true);

        if(filePdf){

          if(filePdf&&allowedFiles.includes(filePdf.type)){
            const storageRef = ref(storage, `/surat_masuk/${filePdf.name}`+ new Date().getTime())
            const uploadTask = uploadBytesResumable(storageRef, filePdf);

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
                        await ArsipSuratService.tambahSuratMasuk(
                          data.tanggalMasuk,
                          data.kodeSurat, 
                          data.nomorSurat, 
                          data.tanggalSurat, 
                          data.pengirim, 
                          data.perihal,
                          url,
                          currentUser.nama_admin,
                        )
                          .then(()=>{
                            setLoading(false);
                            setPdfError('');
                            Swal.fire(
                              'Surat Masuk Berhasil Ditambahkan',
                              'success'
                            )
                            navigate("/admin_surat_masuk");
                          })
                          .catch(()=>{
                            setLoading(false);
                            setPdfError('');
                          })
                    });
                }
            ); 
          
          }
          else{
            setPdfError('File Yang Dicantumkan Harus Pdf');
            setLoading(false);
          }
        }
        else{
          setPdfError('File Pdf Belum Dicantumkan ');
          setLoading(false); 
        }      

      },
    });

    //-----------------------------------------------------//

    const onChangeFilePdf = (e) => {
      const selectedFile = e.target.files[0];

      if(selectedFile){
        if(selectedFile&&allowedFiles.includes(selectedFile.type)){
          setFilePdf(e.target.files[0]);
          setPdfError('');   
        }
        else{
          setPdfError('File Yang Dicantumkan Harus Pdf');
          setFilePdf('');
        }
      }
      else{
        setFilePdf('');
        setPdfError('File Pdf Belum Dicantumkan ');
      }

    };       

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
          <h1 className="my-4 text-center text-judul-surat-page">Tambah Surat Masuk</h1>
          <div className="container bg-form text-font-surat-page">
            <div className="mx-auto">
              <form className="mx-auto px-4" onSubmit={formik.handleSubmit}>
                <div className="d-flex align-items-center pt-3">
                  <Link className="breadcum-surat-active" to={"/admin_surat_masuk"}> <span>Surat Masuk</span> </Link>
                    <span className="mx-2"><ArrowRight/></span>
                  <span className="breadcum-surat">Tambah Surat Masuk </span>
                </div>
                <hr className="py-1"/>
                <div className="row mb-3">
                  <label forhtml="tanggalMasuk" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Tanggal Masuk:</label>
                  <div className="col-sm-10">
                    <input 
                      type="date" 
                      className="form-control" 
                      name="tanggalMasuk"
                      value={formik.values.tanggalMasuk}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.tanggalMasuk ? formik.errors.tanggalMasuk : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="kodeSurat" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Kode Surat:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="kodeSurat"
                      value={formik.values.kodeSurat}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.kodeSurat ? formik.errors.kodeSurat : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="nomorSurat" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Nomor Surat:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="nomorSurat"
                      value={formik.values.nomorSurat}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.nomorSurat ? formik.errors.nomorSurat : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="tanggalSurat" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Tanggal Surat:</label>
                  <div className="col-sm-10">
                    <input 
                      type="date" 
                      className="form-control" 
                      name="tanggalSurat"
                      value={formik.values.tanggalSurat}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.tanggalSurat ? formik.errors.tanggalSurat : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="pengirim" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Pengirim:</label>
                  <div className="col-sm-10">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="pengirim"
                      value={formik.values.pengirim}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.pengirim ? formik.errors.pengirim : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label forhtml="perihal" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">Perihal:</label>
                  <div className="col-sm-10">
                    <textarea 
                      type="text" 
                      className="form-control" 
                      name="perihal"
                      value={formik.values.perihal}
                      onChange={formik.handleChange}
                    />
                    <div className="text-danger">
                      {formik.errors.perihal ? formik.errors.perihal : null}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label forhtml="filePdf" className="col-sm-2 col-form-label text-sm-end text-form-surat-page">File Pdf:</label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <input 
                        className="form-control" 
                        type="file" 
                        name="filePdf"
                        id="filePdf"
                        onChange={onChangeFilePdf}
                      />
                      {filePdf && 
                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#pdfView">
                          Lihat Pdf
                        </button> 
                      }
                    </div>
                    {pdfError&&<div className='text-danger'>{pdfError}</div>}
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
                    <span><Download/> Simpan</span>
                  </button>
                  <p>{percent == 0 ? null: `${percent}% selesai`}</p>
                </div>
              </form>
            </div>
          </div>
          {filePdf && <PdfViewer pdf={filePdf} />}
        </Navbar>

        }
      </div>
    )
}

export default TambahSuratMasukPage;