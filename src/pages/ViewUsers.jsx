import React, { useEffect, useState } from 'react';
import '../Styles/ViewUsers.css';
import Header from './Header';
import axios from 'axios';

const ViewUsers = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch residents only from backend
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
    user.u_Name?.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="view-users-container">
      <Header showNav={false} showLogout={false} showBackButton={true} />
      <h1 className="title">All Registered Users</h1>

      {/* 🔹 Resident Count */}
      <div className="summary-card total-users">
        Total Registered Residents: {filteredUsers.length}
      </div>

      {/* 🔍 Search Box */}
      <div className="search-section">
        <input
          type="text"
          id="searchInput"
          placeholder="Search by name, username, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 👥 Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="no-users-message">
          {search ? 'No users found matching your search.' : 'No registered residents found.'}
        </div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>USER ID</th>
              <th>NAME</th>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>PHONE NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.u_id}>
                <td>{user.u_id}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.u_Name || 'N/A'}</td>
                <td>{user.u_Email || 'N/A'}</td>
                <td>{user.u_no || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewUsers;