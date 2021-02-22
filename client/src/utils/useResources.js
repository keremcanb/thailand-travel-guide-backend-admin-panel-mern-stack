import { useState, useEffect } from 'react';
import api from './api';

const useResources = (resource) => {
  const [resources, setResources] = useState([]);

  const fetchResource = async (resource) => {
    const { data } = await api.get(`/${resource}`);
    setResources(data);
  };

  useEffect(() => {
    fetchResource(resource);
  }, [resource]);

  return resources;
};

export default useResources;
