// import model
const { AdminArsipSurat } = require('../../../models');

module.exports = {
  dataAdmin: (req, res) => {
    AdminArsipSurat.findAll()
      .then((admins) => res.json(admins))
      .catch((err) => res.json(err));
  },

  tambahAdmin: (req, res) => {
    AdminArsipSurat.tambahAdmin(req.body)
      .then((admin) => res.json({ message: `Admin dengan nama ${admin.nama_admin} berhasil ditambahkan` }))
      .catch((err) => res.json(err));
  },

  deleteAdmin: (req, res) => {
    AdminArsipSurat.destroy({ where: { username: req.params.username } })
      .then(() => res.json({ msg: `Admin dengan Username ${req.params.username} berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  updateAdmin: (req, res) => {
    AdminArsipSurat.updateAdmin(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Admin berhasil' }))
      .catch((err) => res.json(err));
  },

};
