import React, { useEffect, useState } from 'react'
import Header from './Header'
import '../Styles/Manage.css';
import axios from 'axios'
import search from '../assets/image 2.png';

function ManageAdmins() {
    const [input, setInput] = useState([])
    const [filteredAdmins, setFilteredAdmins] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [editingAdmin, setEditingAdmin] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [newAdmin, setNewAdmin] = useState({
        name: '',
        u_Name: '',
        u_Email: '',
        u_no: '',
        u_pass: '',
        role: 'admin'
    })

    useEffect(() => {
        fetchAdmins();
    }, [])

    const fetchAdmins = () => {
        axios.get("http://localhost:8080/api/admins")
            .then((response) => {
                console.log(response.data)
                setInput(response.data);
                setFilteredAdmins(response.data);
            })
            .catch((error) => {
                console.error("Error fetching admins:", error);
            });
    }

    // Handle search functionality
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);
        
        if (searchValue === '') {
            setFilteredAdmins(input);
            } 
        else {
            const filtered = input.filter(admin => 
                admin.name.toLowerCase().includes(searchValue) ||
                admin.u_id.toString().includes(searchValue) ||
                admin.u_no.toString().includes(searchValue)
            );
          setFilteredAdmins(filtered);
        }
    }

    // Handle Add New Admin
    const handleAdd = () => {
        setNewAdmin({
            name: '',
            u_Name: '',
            u_Email: '',
            u_no: '',
            u_pass: '',
            role: 'admin'
        });
      setShowAddModal(true);
    }

    // Handle Create Admin
    const handleCreate = () => {
        // Basic validation
        if (!newAdmin.name || !newAdmin.u_Name || !newAdmin.u_Email || !newAdmin.u_no || !newAdmin.u_pass) {
            alert("Please fill in all fields!");
            return;
        }

        axios.post("http://localhost:8080/api/admins", newAdmin)
            .then((response) => {
                console.log("Admin created successfully");
                setShowAddModal(false);
                setNewAdmin({
                    name: '',
                    u_Name: '',
                    u_Email: '',
                    u_no: '',
                    u_pass: '',
                    role: 'admin'
                });
                fetchAdmins(); // Refresh the list
                alert("Admin created successfully!");
            })
            .catch((error) => {
                console.error("Error creating admin:", error);
                alert("Error creating admin!");
            });
    }

    // Handle Edit Admin
    const handleEdit = (admin) => {
        setEditingAdmin({...admin});
        setShowEditModal(true);
    }

    // Handle Update Admin
    const handleUpdate = () => {
        axios.put(`http://localhost:8080/api/admins/${editingAdmin.u_id}`, editingAdmin)
            .then((response) => {
                console.log("Admin updated successfully");
                setShowEditModal(false);
                setEditingAdmin(null);
                fetchAdmins(); // Refresh the list
                alert("Admin updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating admin:", error);
                alert("Error updating admin!");
            });
    }

    // Handle Delete Admin
    // const handleDelete = (adminId, adminName) => {
    //     if (window.confirm(`Are you sure you want to delete admin "${adminName}"?`)) {
    //         axios.delete(`http://localhost:8080/api/admins/${adminId}`)
    //             .then((response) => {
    //                 console.log("Admin deleted successfully");
    //                 fetchAdmins(); // Refresh the list
    //                 alert("Admin deleted successfully!");
    //             })
    //             .catch((error) => {
    //                 console.error("Error deleting admin:", error);
    //                 alert("Error deleting admin!");
    //             });
    //     }
    // }

    // Handle input changes in edit modal
    const handleInputChange = (field, value) => {
        setEditingAdmin(prev => ({
            ...prev,
            [field]: value
        }));
    }

    // Handle input changes in add modal
    const handleNewAdminInputChange = (field, value) => {
        setNewAdmin(prev => ({
            ...prev,
            [field]: value
        }));
    }

    return (
        <>
            <Header />
            
            <div style={{margin: '1%',textAlign: 'center',fontSize: '300%',color: '#133188'}}>
                Manage Admins
            </div>

            {/* Add New Admin Button */}
            <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',margin: '20px 50px'}}>
                <div style={{backgroundColor: 'gainsboro',borderRadius: '20px',padding: '10px',width: 'fit-content',display: 'flex',alignItems: 'center'}}>
                    <input type="search" placeholder="Search by name, ID, or contact" value={searchTerm} onChange={handleSearch}
                           style={{border: 'none',outline: 'none',backgroundColor: 'transparent',padding: '5px'}}/>
                    <img src={search} alt="search" style={{width: '20px',height: '20px',marginLeft: '8px'}}/>
                </div>

                <button onClick={handleAdd}style={{backgroundColor: '#28a745',color: 'white',border: 'none',padding: '12px 24px',borderRadius: '8px',cursor: 'pointer',fontSize: '16px',fontWeight: 'bold',boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}>
                    + Add New Admin
                </button>
            </div>

            <table style={{width: '90%',margin: '20px auto',borderCollapse: 'collapse',boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                <thead>
                    <tr style={{backgroundColor: '#FD8D36',color: 'white'}}>
                        <th style={{padding: '12px',textAlign: 'left',border: '1px solid #ddd'}}>
                          ADMIN ID
                        </th>
                        <th style={{padding: '12px',textAlign: 'left',border: '1px solid #ddd'}}>
                          NAME
                        </th>
                        <th style={{padding: '12px',textAlign: 'left',border: '1px solid #ddd'}}>
                          CONTACT
                        </th>
                        <th style={{padding: '12px',textAlign: 'center',border: '1px solid #ddd'}}>
                          ACTIONS
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAdmins.length > 0 ? (
                        filteredAdmins.map((item, index) => (
                            <tr key={index} style={{backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'}}>
                                <td style={{padding: '10px',border: '1px solid #ddd'}}>
                                    {item.u_id}
                                </td>
                                <td style={{padding: '10px',border: '1px solid #ddd'}}>
                                    {item.name}
                                </td>
                                <td style={{padding: '10px',border: '1px solid #ddd'}}>
                                    {item.u_no}
                                </td>
                                <td style={{padding: '10px',border: '1px solid #ddd',textAlign: 'center'}}>
                                    <button onClick={() => handleEdit(item)}style={{backgroundColor: '#007bff',color: 'white',border: 'none',padding: '8px 16px',borderRadius: '4px',cursor: 'pointer',marginRight: '8px',fontSize: '14px'}}onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
                                        Edit
                                    </button>

                                    {/* <button 
                                        onClick={() => handleDelete(item.u_id, item.name)}
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                                    >
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{padding: '20px',textAlign: 'center',color: '#666',fontStyle: 'italic'}}>
                                {searchTerm ? 'No admins found matching your search.' : 'No admins available.'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Edit Modal */}
            {showEditModal && (
                <div style={{position: 'fixed',top: 0,left: 0,width: '100%',height: '100%',backgroundColor: 'rgba(0,0,0,0.5)',display: 'flex',justifyContent: 'center',alignItems: 'center',zIndex: 1000}}>
                    <div style={{backgroundColor: 'white',padding: '30px',borderRadius: '10px',width: '500px',maxWidth: '90%'}}>
                        <h2 style={{ marginBottom: '20px', color: '#133188' }}>
                          Edit Admin
                          </h2>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                              Name:
                            </label>

                            <input type="text" value={editingAdmin.name} onChange={(e) => handleInputChange('name', e.target.value)}style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}/>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Username:
                          </label>

                            <input type="text" value={editingAdmin.u_Name} onChange={(e) => handleInputChange('u_Name', e.target.value)}style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}/>
                          </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                              Email:
                              </label>
                            <input type="email" value={editingAdmin.u_Email} onChange={(e) => handleInputChange('u_Email', e.target.value)}style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}/>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contact:</label>
                            <input type="number" value={editingAdmin.u_no} onChange={(e) => handleInputChange('u_no', parseInt(e.target.value))}
                                style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}/>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
                            <input type="password" value={editingAdmin.u_pass} onChange={(e) => handleInputChange('u_pass', e.target.value)}
                                style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}/>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                            <button onClick={() => {setShowEditModal(false);setEditingAdmin(null);}}
                                style={{backgroundColor: '#6c757d',color: 'white',border: 'none',padding: '10px 20px',borderRadius: '4px',cursor: 'pointer'}}>
                                Cancel
                            </button>

                            <button onClick={handleUpdate}style={{backgroundColor: '#28a745',color: 'white',border: 'none',padding: '10px 20px',borderRadius: '4px',cursor: 'pointer'}}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add New Admin Modal */}
            {showAddModal && (
                <div style={{position: 'fixed',top: 0,left: 0,width: '100%',height: '100%',backgroundColor: 'rgba(0,0,0,0.5)',display: 'flex',justifyContent: 'center',alignItems: 'center',zIndex: 1000}}>
                    <div style={{backgroundColor: 'white',padding: '30px',borderRadius: '10px',width: '500px',maxWidth: '90%'}}>
                        <h2 style={{ marginBottom: '20px', color: '#133188' }}>
                          Add New Admin
                        </h2>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name: *</label>
                            <input type="text" value={newAdmin.name} onChange={(e) => handleNewAdminInputChange('name', e.target.value)}style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}placeholder="Enter full name"/>
                        </div>

                        <div style={{ marginBottom: '15px' }}><label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Username: *
                          </label>

                          <input type="text" value={newAdmin.u_Name} onChange={(e) => handleNewAdminInputChange('u_Name', e.target.value)}style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}placeholder="Enter username"/>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                              Email: *
                              </label>
                            <input type="email" value={newAdmin.u_Email} onChange={(e) => handleNewAdminInputChange('u_Email', e.target.value)}style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}placeholder="Enter email address"/>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contact: *</label>
                            <input type="number" value={newAdmin.u_no} onChange={(e) => handleNewAdminInputChange('u_no', e.target.value)}style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}placeholder="Enter contact number"/>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password: *</label>
                            <input type="password" value={newAdmin.u_pass} onChange={(e) => handleNewAdminInputChange('u_pass', e.target.value)}style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}placeholder="Enter password"/>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Role:</label>
                            <select value={newAdmin.role} onChange={(e) => handleNewAdminInputChange('role', e.target.value)}style={{width: '100%',padding: '8px',border: '1px solid #ddd',borderRadius: '4px'}}>
                                <option value="admin">
                                  Admin
                                </option>
                                <option value="superadmin">
                                  Super Admin
                                </option>
                            </select>
                        </div>

                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
                            * Required fields
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                            <button onClick={() => {setShowAddModal(false);setNewAdmin({
                                        name: '',
                                        u_Name: '',
                                        u_Email: '',
                                        u_no: '',
                                        u_pass: '',
                                        role: 'admin'
                                    });
                                }}
                                style={{backgroundColor: '#6c757d',color: 'white',border: 'none',padding: '10px 20px',borderRadius: '4px',cursor: 'pointer'}}>
                                Cancel
                            </button>
                            <button onClick={handleCreate}style={{backgroundColor: '#28a745',color: 'white',border: 'none',padding: '10px 20px',borderRadius: '4px',cursor: 'pointer'}}>
                                Create Admin
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ManageAdmins