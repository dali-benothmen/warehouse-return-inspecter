"use client"

import React, { useCallback } from "react";
import { useSearchReturn } from "./hooks/useSearchReturn";
import { ReturnDetails } from "./components/ReturnDetails";
import { ReturnItemsInspector } from "./components/ReturnItemsInspector";
import { BarcodeScanner } from "./components/BarcodeScanner";
import { ToastContainer } from "./components/Toast";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Alert } from "./components/Alert";
import { useToast } from "./hooks/useToast";
import { MESSAGES } from "./lib/constants";



export default function Home() {
  const { returnData, loading, error, searchReturn, setReturnData } = useSearchReturn();
  const { toasts, showToast, removeToast } = useToast();

  const handleUpdateItem = useCallback(async (itemId: number) => {
    if (!returnData) return;

    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          item: {
            is_arrived: true,
            is_inspected: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      setReturnData({
        ...returnData,
        items: returnData.items.map(item =>
          item.id === itemId
            ? { ...item, is_arrived: true, is_inspected: true }
            : item
        ),
      });

      showToast('Item confirmed successfully!', 'success');
    } catch (err) {
      showToast(MESSAGES.UPDATE_FAILED, 'error');
    }
  }, [returnData, setReturnData, showToast]);

  const handleClearSearch = useCallback(() => {
    setReturnData(null);
  }, [setReturnData]);

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Warehouse Return Inspector
          </h1>
          <p className="text-gray-500 text-lg">
            Scan order number to begin inspection
          </p>
        </div>

        <BarcodeScanner
          onSearch={searchReturn}
          isLoading={loading}
          onClear={handleClearSearch}
        />

        {loading && <LoadingSpinner message={MESSAGES.LOADING} />}

        {error && (
          <Alert
            variant="error"
            title="Unable to fetch return"
            message={error}
          />
        )}

        {returnData && !loading && (
          <div className="animate-fade-in space-y-8">
            <ReturnDetails returnData={returnData} />
            <ReturnItemsInspector
              items={returnData.items}
              onUpdateItem={handleUpdateItem}
            />
          </div>
        )}
      </div>
    </div>
  );
}
