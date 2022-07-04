// import model
const { SuratMasuk } = require('../../../models');

module.exports = {
  dataSuratMasuk: (req, res) => {
    SuratMasuk.findAll()
      .then((surats) => res.json(surats))
      .catch((err) => res.json(err));
  },

  tambah: (req, res) => {
    SuratMasuk.tambah(req.body)
      .then((surat) => res.json(surat))
      .catch((err) => res.json(err));
  },

  hapus: (req, res) => {
    SuratMasuk.hapus(req.params.id)
      .then(() => res.json({ msg: 'Surat berhasil dihapus' }))
      .catch((err) => res.json(err));
  },

  ubah: (req, res) => {
    SuratMasuk.ubah(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Surat berhasil' }))
      .catch((err) => res.json(err));
  },

  getSuratById: (req, res) => {
    SuratMasuk.getSuratById(req.params.id)
      .then((surat) => res.json(surat))
      .catch((err) => res.json(err));
  },

};
