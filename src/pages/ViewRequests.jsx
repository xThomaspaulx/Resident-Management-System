import React, { useEffect, useState } from 'react';
import '../Styles/ViewRequests.css';
import Header from './Header';
import axios from 'axios';

const ViewRequests = () => {
  const [filter, setFilter] = useState('All');
  const [requests, setRequests] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/requests')
      .then((res) => {
        const formatted = res.data.map((req) => ({
          id: req.id,
          user: req.user || 'Unknown',
          service: req.service || 'Unknown',
          status: formatStatus(req.status),
          delayed: req.delayed || false
        }));
        setRequests(formatted);
      })
      .catch((err) => {
        console.error('Error fetching requests:', err);
      });
  }, []);

  // Format status for UI display
  const formatStatus = (status) => {
    if (status === 'InProgress') return 'In Progress';
    return status;
  };

  // Filtering logic
  const filteredRequests =
    filter === 'All'
      ? requests
      : filter === 'Delayed'
      ? requests.filter((req) => req.delayed)
      : requests.filter((req) => req.status === filter);

  // Summary counts
  const total = requests.length;
  const completed = requests.filter((r) => r.status === 'Completed').length;
  const pending = requests.filter((r) => r.status === 'Pending').length;
  const delayed = requests.filter((r) => r.delayed).length;

  return (
    <div className="view-requests-container">
      <Header showNav={false} showLogout={false} showBackButton={true} />
      <h1 className="title">View All Requests</h1>

      {/* 🔹 Summary section */}
      <div className="summary-boxes">
        <div className="summary-card total">Total: {total}</div>
        <div className="summary-card pending">Pending: {pending}</div>
        <div className="summary-card completed">Completed: {completed}</div>
        <div className="summary-card delayed">Delayed: {delayed}</div>
      </div>

      {/* 🔸 Filter dropdown */}
      <div className="filter-section">
        <label htmlFor="statusFilter"><strong>Filter by Status:</strong></label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Delayed">Delayed</option>
        </select>
      </div>

      {/* 🔸 Table */}
      <table className="requests-table">
        <thead>
          <tr>
            <th>REQUEST ID</th>
            <th>USER</th>
            <th>SERVICE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((req) => (
            <tr key={req.id}>
              <td>#{req.id}</td>
              <td>{req.user}</td>
              <td>{req.service}</td>
              <td>
                <span className={`status ${req.status.toLowerCase().replace(' ', '-')}`}>
                  {req.delayed ? `${req.status} (Delayed)` : req.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRequests;
