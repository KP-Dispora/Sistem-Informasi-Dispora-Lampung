import axios from "axios";
const API_URL = "http://localhost:8000/proposal/";

// Akun Admin
const getDataAdmin = () => {
	return axios.get(API_URL + "get_data_admin", {withCredentials: true});
}

const updateProfileAdmin = (id, namaAdmin, username, password, foto) => {
	return axios.put(API_URL + `update_admin/${id}`,
		{namaAdmin, username, password, foto},
		{withCredentials: true}
	);
}

// Proposal
const getDataProposal = () => {
	return axios.get(API_URL + "get_data_proposal");
}

const tambahProposal = (namaLengkap, noTelp, email, asalInstansi, perihal, status,) => {
	return axios.post(API_URL + "tambah_proposal",
	 {namaLengkap, noTelp, email, asalInstansi, perihal, status,},
	 {withCredentials: true}
	);
}

const deleteProposal = (id) => {
	return axios.delete(API_URL + `delete_proposal/${id}`, {withCredentials: true}  )
}

const getDataProposalById = (id) => {
	 return axios.get(API_URL + `get_data_byId_proposal/${id}`)
}

const editProposal = (id, namaLengkap, noTelp, email, asalInstansi, perihal, status,) => {
	 return axios.put(API_URL + `update_proposal/${id}`,
	 	{namaLengkap, noTelp, email, asalInstansi, perihal, status,}, 
	 	{withCredentials: true}
	 );
}



export default {
  getDataAdmin,
  updateProfileAdmin,
  getDataProposal,
  tambahProposal,
  getDataProposalById,
  deleteProposal,
  editProposal,
};