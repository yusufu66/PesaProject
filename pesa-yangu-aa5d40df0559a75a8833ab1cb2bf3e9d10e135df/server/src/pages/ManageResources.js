import React, { useState, useEffect, useContext } from 'react';
import { fetchAllResourcesAdmin, createResource, deleteResource } from '../Api';
import { AuthContext } from '../context/AuthContext';

const ManageResources = () => {
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const loadResources = async () => {
      try {
        const res = await fetchAllResourcesAdmin(user.jwt);
        setResources(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadResources();
  }, [user]);

  const handleCreate = async () => {
    try {
      const newRes = { data: { title, description } };
      await createResource(newRes, user.jwt);
      setTitle('');
      setDescription('');
      // Refresh list
      const res = await fetchAllResourcesAdmin(user.jwt);
      setResources(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResource(id, user.jwt);
      setResources(resources.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Resources</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Resource
        </button>
      </div>
      <div className="space-y-2">
        {resources.map((resItem) => (
          <div key={resItem.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <h3 className="font-semibold">{resItem.attributes.title}</h3>
              <p>{resItem.attributes.description}</p>
            </div>
            <button
              onClick={() => handleDelete(resItem.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageResources;