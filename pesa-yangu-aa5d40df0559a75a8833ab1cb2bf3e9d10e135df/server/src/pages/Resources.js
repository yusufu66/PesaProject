jsx
import React, { useState, useEffect, useContext } from 'react';
import { fetchResources } from '../Api';
import { AuthContext } from '../context/AuthContext';

const Resources = () => {
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const res = await fetchResources(user.jwt);
        setResources(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadResources();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resItem) => (
          <div key={resItem.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{resItem.attributes.title}</h3>
            <p className="mt-2">{resItem.attributes.description}</p>
            {/* Add link to view or download resource */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;