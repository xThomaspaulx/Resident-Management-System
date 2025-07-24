import React from 'react';
import '../Styles/SuperAdmin.css';
import { Link } from 'react-router-dom';
import Header from './Header'; 

const SuperAdmin = () => {
  return (
    <div className="page-container">
      <Header /> 

      <h1 className="dashboard-title">SUPER ADMIN DASHBOARD</h1>

      <div className="main-buttons">
        <Link to="/ManageAdmins" className="card">Manage Admins</Link>
        <Link to="/ViewRequests" className="card">View All Requests</Link>
        <Link to="/ViewUsers" className="card">View all Users</Link>
      </div>

      <div className="welcome-box">
        <p>
          <strong><em>Welcome, Super Admin!</em></strong><br />
          <em>Use the buttons above to manage the system.</em>
        </p>
      </div>

      
    </div>
  );
};

export default SuperAdmin;
