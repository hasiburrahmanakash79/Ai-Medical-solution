

import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/api-client';

const useUser = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/dashboard/user-list');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch Data');
      setUsers(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchData().then(() => {
      if (!isMounted) return;
    });

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return {
    users,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useUser;