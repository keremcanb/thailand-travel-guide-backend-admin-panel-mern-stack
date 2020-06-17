import { useState, useEffect } from 'react';
import { get } from 'axios';

const useResources = (resource) => {
  const [resources, setResources] = useState([]);

  async function fetchResource(resource) {
    const response = await get(`/api/${resource}`);
    setResources(response.data);
  }

  useEffect(() => {
    fetchResource(resource);
  }, [resource]);

  return resources;
};

export default useResources;
