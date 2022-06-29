const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const { arsipSurat } = require('../controllers');
const {
  tambahAdminRules, updateAdminRules,
  validate,
} = require('../lib/validator');

// Endpoint Login
router.post('/login', arsipSurat.authArsipSurat.login);
router.post('/tambah_admin', tambahAdminRules(), validate, arsipSurat.crudAdmin.tambahAdmin);

// ---------------------Endpoint dibawah dan setelahnya memiliki autentikasi--------------------

// Endpoint Admin yg sedang login
router.get('/whoami', authenticate.AdminArsipSurat, arsipSurat.authArsipSurat.whoami);
// Endpoint Logout
router.get('/logout', authenticate.AdminArsipSurat, arsipSurat.authArsipSurat.logout);

// Akun Admin
router.get('/get_data_admin', authenticate.AdminArsipSurat, arsipSurat.crudAdmin.dataAdmin);
router.delete('/delete_admin/:username', authenticate.AdminArsipSurat, arsipSurat.crudAdmin.deleteAdmin);
router.put('/update_admin/:id', authenticate.AdminArsipSurat, updateAdminRules(), validate, arsipSurat.crudAdmin.updateAdmin);

module.exports = router;
