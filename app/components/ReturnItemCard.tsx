"use client"

import React, { useCallback, useState } from "react"
import { ReturnItem } from "../types/returns";
import { UI_CONSTANTS } from "../lib/constants";

type ReturnItemCardProps = {
  item: ReturnItem;
  onConfirm: (itemId: number) => void;
  isCompleted?: boolean;
  itemNumber?: number;
};

export const ReturnItemCard = ({ item, onConfirm, isCompleted = false, itemNumber }: ReturnItemCardProps) => {

  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const triggerHapticFeedback = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(UI_CONSTANTS.VIBRATION_DURATION);
    }
  }, []);

  const handleConfirm = useCallback(async () => {
    setIsUpdating(true);
    await onConfirm(item.id);
    setIsUpdating(false);
    setShowSuccess(true);
    triggerHapticFeedback();

    setTimeout(() => setShowSuccess(false), 1000);
  }, [item.id, onConfirm, triggerHapticFeedback]);

  return (
    <div
      className={`group relative bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${isCompleted
        ? 'border-green-200 bg-green-50/30'
        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
        } ${showSuccess ? 'scale-[1.01] border-green-500 ring-1 ring-green-500/20' : ''}`}
    >
      <div className="p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3">
              {itemNumber && (
                <span className={`flex items-center justify-center h-6 w-6 rounded-md text-xs font-bold ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                  {itemNumber}
                </span>
              )}
              <div>
                <h3 className={`text-base font-bold ${isCompleted ? 'text-gray-700' : 'text-gray-900'}`}>
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">SKU: {item.sku || 'N/A'}</p>
              </div>
            </div>
            {isCompleted && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800 uppercase tracking-wide">
                <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Inspected
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 px-3 py-2 rounded-lg">
              <span className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Qty</span>
              <span className="block text-base font-bold text-gray-900">{item.quantity}</span>
            </div>
            <div className="bg-gray-50 px-3 py-2 rounded-lg">
              <span className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Reason</span>
              <span className="block text-sm font-medium text-gray-900 truncate" title={item.return_reason.reason_internal}>
                {item.return_reason.reason_internal}
              </span>
            </div>
          </div>
        </div>

        {!isCompleted && (
          <div className="flex items-center justify-center md:w-40 md:border-l md:border-gray-100 md:pl-4">
            <button
              onClick={handleConfirm}
              disabled={isUpdating}
              className="w-full h-12 md:h-12 md:min-h-[50px] bg-blue-600 text-white rounded-lg text-base font-semibold shadow-md shadow-blue-600/10 hover:bg-blue-700 hover:shadow-blue-600/20 active:scale-95 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving</span>
                </>
              ) : (
                <>
                  <span>Confirm</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div
        className={`absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-1000 ease-out ${showSuccess ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
      />
    </div>
  );
}
