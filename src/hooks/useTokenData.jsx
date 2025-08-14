

import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/api-client';

const useTokenData = () => {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/dashboard/token-data');
      setTokenData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch Data');
      setTokenData(null);
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
    tokenData,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useTokenData;