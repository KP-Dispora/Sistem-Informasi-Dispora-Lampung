const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { arsipSurat } = require('../controllers');
const {
  tambahAdminRules, updateAdminRules,
  validate,
} = require('../lib/validator');

// Endpoint Login
router.post('/login', arsipSurat.authArsipSurat.login);
// Enpoint data Surat Masuk
router.get('/get_data_suratMasuk', arsipSurat.crudSuratMasuk.dataSuratMasuk);
router.get('/get_data_byId_suratMasuk/:id', arsipSurat.crudSuratMasuk.getSuratById);
// Endpoint data Surat Keluar
router.get('/get_data_suratKeluar', arsipSurat.crudSuratKeluar.dataSuratKeluar);
router.get('/get_data_byId_suratKeluar/:id', arsipSurat.crudSuratKeluar.getSuratById);


// ---------------------Endpoint dibawah dan setelahnya memiliki autentikasi--------------------

// Endpoint Admin yg sedang login
router.get('/whoami', authenticate.AdminArsipSurat, arsipSurat.authArsipSurat.whoami);
// Endpoint Logout
router.get('/logout', authenticate.AdminArsipSurat, arsipSurat.authArsipSurat.logout);

// Akun Admin
router.get('/get_data_admin', authenticate.AdminArsipSurat, arsipSurat.crudAdmin.dataAdmin);
router.delete('/delete_admin/:username', authenticate.AdminArsipSurat, arsipSurat.crudAdmin.deleteAdmin);
router.put('/update_admin/:id', authenticate.AdminArsipSurat, updateAdminRules(), validate, arsipSurat.crudAdmin.updateAdmin);
router.post('/tambah_admin', authenticate.AdminArsipSurat, tambahAdminRules(), validate, arsipSurat.crudAdmin.tambahAdmin);

// Endpoint crud surat masuk
router.post('/tambah_suratMasuk', authenticate.AdminArsipSurat, arsipSurat.crudSuratMasuk.tambah);
router.put('/update_suratMasuk/:id', authenticate.AdminArsipSurat, arsipSurat.crudSuratMasuk.ubah);
router.delete('/delete_suratMasuk/:id', authenticate.AdminArsipSurat, arsipSurat.crudSuratMasuk.hapus);

// Endpoint crud surat keluar
router.post('/tambah_suratKeluar', authenticate.AdminArsipSurat, arsipSurat.crudSuratKeluar.tambah);
router.put('/update_suratKeluar/:id', authenticate.AdminArsipSurat, arsipSurat.crudSuratKeluar.ubah);
router.delete('/delete_suratKeluar/:id', authenticate.AdminArsipSurat, arsipSurat.crudSuratKeluar.hapus);

module.exports = router;
