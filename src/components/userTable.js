import React, { useState } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://reqres.in/api/users');
      setUsers(response.data.data);
    } catch (err) {
      setError('Failed to fetch user data. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-table-container">
      <h2>User List</h2>
      <button className="btn" onClick={fetchUsers} disabled={loading}>
        {loading ? 'Loading...' : 'Get User List'}
      </button>

      {loading && <p>Loading user data...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p>No users found. Click the button to fetch user data.</p>
      )}

      {users.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <img 
                    src={user.avatar} 
                    alt={`${user.first_name} ${user.last_name}`} 
                    width="50" 
                    height="50"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
