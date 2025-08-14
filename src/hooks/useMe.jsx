import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/api-client';

const useMe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (signal) => {
    setLoading(true);
    try {
      const response = await apiClient.get('/user/me', { signal });
      setData(response.data);
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') {
        // Ignore abort errors
        return;
      }
      setError(err.message || 'Failed to fetch user data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller.signal);

    return () => {
      controller.abort(); // Cancel the request on unmount
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useMe;