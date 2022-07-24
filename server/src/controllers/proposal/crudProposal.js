// import model
const { Proposal } = require('../../../models');

module.exports = {
  dataProposal: (req, res) => {
    Proposal.findAll()
      .then((proposals) => res.json(proposals))
      .catch((err) => res.json(err));
  },

  tambah: (req, res) => {
    Proposal.tambah(req.body)
      .then((proposal) => res.json(proposal))
      .catch((err) => res.json(err));
  },

  hapus: (req, res) => {
    Proposal.hapus(req.params.id)
      .then(() => res.json({ msg: 'Proposal berhasil dihapus' }))
      .catch((err) => res.json(err));
  },

  ubah: (req, res) => {
    Proposal.ubah(req.body, req.params.id)
      .then(() => res.json({ msg: 'Update Proposal berhasil' }))
      .catch((err) => res.json(err));
  },

  getProposalById: (req, res) => {
    Proposal.getProposalById(req.params.id)
      .then((proposal) => res.json(proposal))
      .catch((err) => res.json(err));
  },

};
