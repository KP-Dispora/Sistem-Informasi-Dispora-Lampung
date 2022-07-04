// import model
const { SuratKeluar } = require('../../../models');

module.exports = {
  dataSuratKeluar: (req, res) => {
    SuratKeluar.findAll()
      .then((surats) => res.json(surats))
      .catch((err) => res.json(err));
  },

  tambah: (req, res) => {
    SuratKeluar.tambah(req.body)
      .then((surat) => res.json(surat))
      .catch((err) => res.json(err));
  },

  hapus: (req, res) => {
    SuratKeluar.hapus(req.params.id)
      .then(() => res.json({ msg: 'Surat berhasil dihapus' }))
      .catch((err) => res.json(err));
  },

  ubah: (req, res) => {
    SuratKeluar.ubah(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Surat berhasil' }))
      .catch((err) => res.json(err));
  },

  getSuratById: (req, res) => {
    SuratKeluar.getSuratById(req.params.id)
      .then((surat) => res.json(surat))
      .catch((err) => res.json(err));
  },

};
