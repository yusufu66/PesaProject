import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../Api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(identifier, password);
      const { jwt, user } = response.data;
      loginUser({ jwt, ...user });
      // Redirect based on role
      if (user.role.name === 'Customer') navigate('/');
      else if (user.role.name === 'Mentor') navigate('/mentor/dashboard');
      else if (user.role.name === 'Admin') navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;