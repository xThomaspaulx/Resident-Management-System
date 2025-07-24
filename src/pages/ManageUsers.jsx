// ManageUsers.jsx
import { useState, useEffect } from 'react';
import Header from './Header'
import '../Styles/Manage.css';
import axios from 'axios';
import find from '../assets/image 2.png';

const ManageUsers = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  
  // Form data state
  const [userData, setUserData] = useState({
    userid: '',
    name: '',
    flatno: '',
    contact: ''
  });

  // ✅ Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Filter users based on search input
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.u_Email?.toLowerCase().includes(search.toLowerCase()) ||
    user.u_Name?.toLowerCase().includes(search.toLowerCase()) ||
    user.userid?.toString().includes(search) ||
    user.flatno?.toString().includes(search) ||
    user.contact?.toString().includes(search)
  );

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add user
  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users', userData);
      setUsers(prev => [...prev, response.data]);
      setShowAdd(false);
      setUserData({ userid: '', name: '', flatno: '', contact: '' });
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user. Please try again.');
    }
  };

  // Handle edit user
  const handleEditUser = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${userData.userid}`, userData);
      setUsers(prev => prev.map(user => 
        user.userid === userData.userid ? response.data : user
      ));
      setShowEdit(false);
      setUserData({ userid: '', name: '', flatno: '', contact: '' });
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user. Please try again.');
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userData.userid}`);
      setUsers(prev => prev.filter(user => user.userid !== userData.userid));
      setShowDelete(false);
      setUserData({ userid: '', name: '', flatno: '', contact: '' });
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    }
  };

  // Open add modal
  const openAddModal = () => {
    setUserData({ userid: '', name: '', flatno: '', contact: '' });
    setShowAdd(true);
  };

  // Open edit modal
  const openEditModal = (user) => {
    setUserData({
      userid: user.userid,
      name: user.name || user.u_Name,
      flatno: user.flatno || user.flat_no,
      contact: user.contact || user.phone
    });
    setShowEdit(true);
  };

  // Open delete modal
  const openDeleteModal = (user) => {
    setUserData({
      userid: user.userid,
      name: user.name || user.u_Name,
      flatno: user.flatno || user.flat_no,
      contact: user.contact || user.phone
    });
    setShowDelete(true);
  };

  // Loading state
  if (loading) {
    return (
      <div className="view-users-container">
        <Header showNav={false} showLogout={false} showBackButton={true} />
        <div className="loading-message">Loading users...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="view-users-container">
        <Header showNav={false} showLogout={false} showBackButton={true} />
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header/>

      <div className="non-sidebar">
        <h1 className="title">MANAGE USERS</h1>
        <div className="search-add">
          <div className="search">
            <input 
              type="search" 
              placeholder="Search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img src={find} alt="search"style={{width: '20px',height: '20px',marginLeft: '4px', marginRight:'3px'}}/>
          </div>
          <button className="add" onClick={openAddModal}>ADD USER</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>SNO</th><th>USER ID</th><th>NAME</th><th>Mail</th><th>CONTACT</th><th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.userid || index}>
                  <td>{index + 1}</td>
                  <td>{user.u_id}</td>
                  <td>{user.u_Name}</td>
                  <td>{user.u_Email }</td>
                  <td>{user.u_no }</td>
                  <td>
                    <button className="edit" onClick={() => openEditModal(user)}>EDIT</button>
                    <button className="delete" onClick={() => openDeleteModal(user)}>DELETE</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <Modal title="ADD USER" onClose={() => setShowAdd(false)}>
          <Form 
            userData={userData} 
            handleChange={handleChange} 
            onCancel={() => setShowAdd(false)} 
            onSubmit={handleAddUser} 
          />
        </Modal>
      )}

      {showEdit && (
        <Modal title="EDIT USER" onClose={() => setShowEdit(false)}>
          <Form 
            userData={userData} 
            handleChange={handleChange} 
            onCancel={() => setShowEdit(false)} 
            onSubmit={handleEditUser} 
          />
        </Modal>
      )}

      {showDelete && (
        <Modal title="DELETE USER" onClose={() => setShowDelete(false)}>
          <div>
            <p>Are you sure to delete<br /><span>user {userData.userid} - {userData.name}?</span></p>
            <div className="btn-row">
              <button className="btn cancel" onClick={() => setShowDelete(false)}>CANCEL</button>
              <button className="btn confirm" onClick={handleDeleteUser}>CONFIRM</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-box">
        <span className="close" onClick={onClose}>×</span>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Form({ userData, handleChange, onCancel, onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div className="form-row">
        <label className="label">NAME</label>
        <input type="text" name="name" className="value" value={userData.name} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label className="label">USER ID</label>
        <input type="text" name="userid" className="value" value={userData.userid} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label className="label">FLAT NO.</label>
        <input type="text" name="flatno" className="value" value={userData.flatno} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label className="label">CONTACT</label>
        <input type="tel" name="contact" className="value" value={userData.contact} onChange={handleChange} required />
      </div>
      <div className="btn-row">
        <button type="button" className="btn cancel" onClick={onCancel}>CANCEL</button>
        <button type="submit" className="btn add">{userData.userid ? 'SAVE CHANGES' : 'ADD'}</button>
      </div>
    </form>
  );
}

export default ManageUsers;