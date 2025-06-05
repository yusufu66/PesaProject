import React, { useState, useEffect, useContext } from 'react';
import { fetchBookings } from '../Api';
import { AuthContext } from '../context/AuthContext';

const MentorBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await fetchBookings(user.jwt);
        // Filter bookings where session.mentor.id === user.id
        const myBookings = res.data.data.filter(
          (b) => b.attributes.session.data.attributes.mentor.data.id === user.id
        );
        setBookings(myBookings);
      } catch (error) {
        console.error(error);
      }
    };
    loadBookings();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded shadow">
            <p>Customer: {book.attributes.user.data.attributes.username}</p>
            <p>Date: {new Date(book.attributes.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorBookings;