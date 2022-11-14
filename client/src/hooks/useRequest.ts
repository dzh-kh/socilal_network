import { useState, useCallback } from "react";

export default function useRequest(callback: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetch = useCallback(
    function () {
      setIsLoading(true);
      setError(null);
      return callback(...arguments)
        .catch((e: any) => setError(e.response.data.message))
        .finally(() => setIsLoading(false));
    },
    [callback]
  );

  return { isLoading, error, fetch };
}
