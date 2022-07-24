// import model
const { AdminProposal } = require('../../../models');

module.exports = {
  dataAdmin: (req, res) => {
    AdminProposal.findAll()
      .then((admins) => res.json(admins))
      .catch((err) => res.json(err));
  },

  tambahAdmin: (req, res) => {
    AdminProposal.tambahAdmin(req.body)
      .then((admin) => res.json({ message: `Admin dengan nama ${admin.nama_admin} berhasil ditambahkan` }))
      .catch((err) => res.json(err));
  },

  deleteAdmin: (req, res) => {
    AdminProposal.destroy({ where: { username: req.params.username } })
      .then(() => res.json({ msg: `Admin dengan Username ${req.params.username} berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  updateAdmin: (req, res) => {
    AdminProposal.updateAdmin(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Admin berhasil' }))
      .catch((err) => res.json(err));
  },

};
