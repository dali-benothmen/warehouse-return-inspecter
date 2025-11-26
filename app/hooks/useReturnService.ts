"use client"

import { useCallback, useState } from "react"
import { ApiResponse, CustomerReturn, ReturnItem } from "../types/returns";
import { MESSAGES } from "../lib/constants";

export const useReturnService = () => {
    const [returnData, setReturnData] = useState<CustomerReturn | null>(null);
    const [loading, setLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
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

            if (!data.customer_returns || data.customer_returns.length === 0) {
                setError(MESSAGES.NO_RETURN_FOUND);
                return;
            }

            setReturnData(data.customer_returns?.[0] ?? null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch return');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateItem = useCallback(async (
        itemId: number,
        updates: Partial<Pick<ReturnItem, 'is_arrived' | 'is_inspected'>>
    ) => {
        if (!returnData) {
            throw new Error('No return data available');
        }

        setIsUpdating(true);
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    item: updates,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            setReturnData({
                ...returnData,
                items: returnData.items.map(item =>
                    item.id === itemId
                        ? { ...item, ...updates }
                        : item
                ),
            });
        } finally {
            setIsUpdating(false);
        }
    }, [returnData]);

    const clearReturn = useCallback(() => {
        setReturnData(null);
        setError(null);
    }, []);

    return {
        returnData,
        loading,
        isUpdating,
        error,
        searchReturn,
        updateItem,
        clearReturn,
    };
}
