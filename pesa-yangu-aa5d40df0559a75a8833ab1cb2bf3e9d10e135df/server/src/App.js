jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import CustomerHome from './pages/CustomerHome';
import Resources from './pages/Resources';
import BookSession from './pages/BookSession';
import MyBookings from './pages/MyBookings';

import MentorDashboard from './pages/MentorDashboard';
import MentorBookings from './pages/MentorBookings';

import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageSessions from './pages/ManageSessions';
import ManageResources from './pages/ManageResources';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Customer Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute role="customer">
                  <CustomerHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute role="customer">
                  <Resources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-session"
              element={
                <ProtectedRoute role="customer">
                  <BookSession />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute role="customer">
                  <MyBookings />
                </ProtectedRoute>
              }
            />

            {/* Mentor Routes */}
            <Route
              path="/mentor/dashboard"
              element={
                <ProtectedRoute role="mentor">
                  <MentorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentor/bookings"
              element={
                <ProtectedRoute role="mentor">
                  <MentorBookings />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-users"
              element={
                <ProtectedRoute role="admin">
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-sessions"
              element={
                <ProtectedRoute role="admin">
                  <ManageSessions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-resources"
              element={
                <ProtectedRoute role="admin">
                  <ManageResources />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;