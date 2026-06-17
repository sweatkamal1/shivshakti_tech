import { useEffect, useState } from "react";

export function usePublicResource<T>(
  key: string | undefined,
  load: (key: string) => Promise<{ data?: T }>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(Boolean(key));
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!key) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    load(key)
      .then((res) => {
        if (cancelled) return;
        if (res.data) {
          setData(res.data);
        } else {
          setData(null);
          setNotFound(true);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setData(null);
        setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [key, load]);

  return { data, loading, notFound };
}
