import { useState, useEffect, DependencyList } from "react";

interface UseFrappeResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFrappe = <T>(
  fetchFn: () => Promise<T>,
  deps: DependencyList = []
): UseFrappeResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchFn()
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err: Error) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
};