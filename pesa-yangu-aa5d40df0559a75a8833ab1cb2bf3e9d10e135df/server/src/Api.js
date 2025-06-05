import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // Adjust if needed

export const login = (identifier, password) => {
  return axios.post(`${API_URL}/auth/local`, { identifier, password });
};

export const register = (username, email, password) => {
  return axios.post(`${API_URL}/auth/local/register`, { username, email, password });
};

export const fetchResources = (token) => {
  return axios.get(`${API_URL}/resources`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createBooking = (data, token) => {
  return axios.post(`${API_URL}/bookings`, { data }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchBookings = (token) => {
  return axios.get(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchUsers = (token) => {
  return axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchSessions = (token) => {
  return axios.get(`${API_URL}/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchAllResourcesAdmin = (token) => {
  return axios.get(`${API_URL}/resources`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createResource = (data, token) => {
  return axios.post(`${API_URL}/resources`, { data }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteResource = (id, token) => {
  return axios.delete(`${API_URL}/resources/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
