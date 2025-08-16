import { useState, useEffect, useCallback } from "react";
import apiClient from "../lib/api-client";

const useDashboardData = (filter) => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/dashboard?filter=${filter}`);
      setHomeData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch HomeData");
      setHomeData(null);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    let isMounted = true;
    console.log(isMounted);
    fetchHomeData();

    return () => {
      isMounted = false;
    };
  }, [fetchHomeData, filter]);

  return {
    homeData,
    loading,
    error,
    refetch: fetchHomeData,
  };
};

export default useDashboardData;
