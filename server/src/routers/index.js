const router = require('express').Router();
const arsipSurat = require('./arsipSurat');

router.use('/arsip_surat', arsipSurat);

module.exports = router;
