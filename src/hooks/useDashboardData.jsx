

import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/api-client';

const useDashboardData = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/dashboard');
      setHomeData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch HomeData');
      setHomeData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchHomeData().then(() => {
      if (!isMounted) return;
    });

    return () => {
      isMounted = false;
    };
  }, [fetchHomeData]);

  return {
    homeData,
    loading,
    error,
    refetch: fetchHomeData,
  };
};

export default useDashboardData;
