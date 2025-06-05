jsx
import React, { useState, useEffect, useContext } from 'react';
import { fetchSessions, createBooking } from '../Api';
import { AuthContext } from '../context/AuthContext';

const BookSession = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');

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

  const handleBooking = async () => {
    try {
      await createBooking({ session: selectedSession }, user.jwt);
      alert('Booking successful');
    } catch (error) {
      console.error(error);
      alert('Booking failed');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book a Session</h2>
      <select
        value={selectedSession}
        onChange={(e) => setSelectedSession(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="">Select a mentor/session</option>
        {sessions.map((sess) => (
          <option key={sess.id} value={sess.id}>
            {sess.attributes.title}
          </option>
        ))}
      </select>
      <button
        onClick={handleBooking}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookSession;