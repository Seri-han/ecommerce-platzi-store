import { useState, useEffect } from 'react';

export const useFetch = (fetchFn) => {
    const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = async () => {
        setLoading(true);
        try {
            const result = await fetchFn();
            setData(result.data || result);
            setError(null);
        } catch (err) {
            setError(err.message || 'An error occurred');
            setData(null);
        } finally {
            setLoading(false);
        }
    };

useEffect(() => {
  setLoading(true);
  refetch();
}, []);
;

    return { data, loading, error, refetch };
}