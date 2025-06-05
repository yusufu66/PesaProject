import React, { useState, useEffect, useContext } from 'react';
import { fetchSessions } from '../Api';
import { AuthContext } from '../context/AuthContext';

const ManageSessions = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const res = await fetchSessions(user.jwt);
        setSessions(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadSessions();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Sessions/</h2>     <div className="space-y-2">
        {sessions.map((sess) => (
          <div key={sess.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <h3 className="font-semibold">{sess.attributes.title}</h3>
              <p>Mentor: {sess.attributes.mentor.data.attributes.username}</p>
            </div>
            {/* Add edit/delete buttons here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSessions;