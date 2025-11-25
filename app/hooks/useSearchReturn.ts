"use client"

import { useCallback, useState } from "react"
import { ApiResponse, CustomerReturn } from "../types/returns";
import { MESSAGES } from "../lib/constants";

export const useSearchReturn = () => {
  const [returnData, setReturnData] = useState<CustomerReturn | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchReturn = useCallback(async (orderNumber: string) => {
    try {
      setLoading(true);
      setError(null);
      setReturnData(null);

      const response = await fetch(
        `/api/returns?order=${encodeURIComponent(orderNumber)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.customer_returns.length === 0) {
        setError(MESSAGES.NO_RETURN_FOUND);
        return;
      }

      setReturnData(data.customer_returns[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch return');
    } finally {
      setLoading(false);
    }
  }, []);

  return { returnData, loading, error, searchReturn, setReturnData };
}