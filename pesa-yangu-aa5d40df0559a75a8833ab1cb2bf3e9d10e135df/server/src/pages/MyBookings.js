jsx
import React, { useState, useEffect, useContext } from 'react';
import { fetchBookings } from '../Api';
import { AuthContext } from '../context/AuthContext';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await fetchBookings(user.jwt);
        setBookings(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadBookings();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4"> My Bookings </h2> <div className="space-y-4">
        {bookings.map((book) => (
          <div key={book.id} className="bg-white p-4rounded shadow">
            <p>Session: {book.attributes.session.data.attributes.title}</p>
            <p>Date: {new Date(book.attributes.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;