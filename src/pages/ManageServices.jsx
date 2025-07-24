import { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/SuperAdmin.css';
// import '../Styles/user.css';
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function ManageServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({ sId: "", sName: "" });
  const [deleteId, setDeleteId] = useState(null);
  const [newService, setNewService] = useState({ sId: "", sName: "" });

  const API_URL = "http://localhost:8080/api/manage-services";

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        sId: parseInt(newService.sId),
        sName: newService.sName
      };
      await axios.post(API_URL, payload);
      fetchServices();
      setShowAddModal(false);
      setNewService({ sId: "", sName: "" });
    } catch (error) {
      alert("Error adding service: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        sName: editData.sName
      };
      await axios.put(`${API_URL}/${editData.sId}`, payload);
      fetchServices();
      setShowEditModal(false);
    } catch (error) {
      alert("Error updating service: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      fetchServices();
      setShowDeleteModal(false);
    } catch (error) {
      alert("Error deleting service.");
    }
  };

  return (
    <div>
        <Header/>
      {/* Main Content */}
      <div className="non-sidebar">
        <h1 className="title">MANAGE SERVICES</h1>
        <div className="search-add">
          <div className="search">
            <input type="search" placeholder="Search" />
            <img src="image 2.png" alt="" />
          </div>
          <button className="add" onClick={() => setShowAddModal(true)}>ADD SERVICE</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>SNO</th>
              <th>SERVICE ID</th>
              <th>SERVICE NAME</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service, index) => (
                <tr key={service.sId}>
                  <td>{index + 1}</td>
                  <td>{service.sId}</td>
                  <td>{service.sName}</td>
                  <td>
                    <button className="edit" onClick={() => {
                      setEditData({ 
                        sId: service.sId, 
                        sName: service.sName
                      });
                      setShowEditModal(true);
                    }}>EDIT</button>
                    <button className="delete" onClick={() => {
                      setDeleteId(service.sId);
                      setShowDeleteModal(true);
                    }}>DELETE</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No services available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-box">
            <span className="close" onClick={() => setShowAddModal(false)}>×</span>
            <h2>ADD SERVICE</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="form-row">
                <label className="label">SERVICE ID</label>
                <input
                  type="number"
                  className="value"
                  value={newService.sId}
                  onChange={(e) => setNewService({ ...newService, sId: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <label className="label">SERVICE NAME</label>
                <input
                  type="text"
                  className="value"
                  value={newService.sName}
                  onChange={(e) => setNewService({ ...newService, sName: e.target.value })}
                  required
                />
              </div>
              <div className="btn-row">
                <button type="button" className="btn cancel" onClick={() => setShowAddModal(false)}>CANCEL</button>
                <button type="submit" className="btn add">ADD</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-box">
            <span className="close" onClick={() => setShowEditModal(false)}>×</span>
            <h2>EDIT SERVICE</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="form-row">
                <label className="label">SERVICE ID</label>
                <input type="text" className="value" value={editData.sId} disabled />
              </div>
              <div className="form-row">
                <label className="label">SERVICE NAME</label>
                <input
                  type="text"
                  className="value"
                  value={editData.sName}
                  onChange={(e) => setEditData({ ...editData, sName: e.target.value })}
                  required
                />
              </div>
              <div className="btn-row">
                <button type="button" className="btn cancel" onClick={() => setShowEditModal(false)}>CANCEL</button>
                <button type="submit" className="btn save">SAVE CHANGES</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-box small">
            <span className="close" onClick={() => setShowDeleteModal(false)}>×</span>
            <form onSubmit={(e) => { e.preventDefault(); handleDeleteConfirm(); }}>
              <p>
                Are you sure to delete<br />
                <span id="deleteUserInfo">service ID {deleteId}?</span>
              </p>
              <div className="btn-row">
                <button type="button" className="btn cancel" onClick={() => setShowDeleteModal(false)}>CANCEL</button>
                <button type="submit" className="btn confirm">CONFIRM</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}