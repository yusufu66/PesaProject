import React, { useState, useEffect, useContext } from 'react';
import { fetchUsers } from '../Api';
import { AuthContext } from '../context/AuthContext';

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchUsers(user.jwt);
        setUsers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadUsers();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.id} className="bg-white p-4 rounded shadow flex justify-between">
            <span>{u.attributes.username} ({u.attributes.email})</span>
            <span>Role: {u.attributes.role.data.attributes.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;