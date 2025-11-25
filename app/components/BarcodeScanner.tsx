"use client"

import React, { ChangeEvent, FormEvent, useCallback, useState, useRef } from "react";

type BarcodeScannerProps = {
  onSearch: (orderNumber: string) => void;
  isLoading: boolean;
  onClear?: () => void;
};

export const BarcodeScanner = ({ onSearch, isLoading, onClear }: BarcodeScannerProps) => {
  const [orderNumber, setOrderNumber] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (orderNumber.trim()) {
      onSearch(orderNumber.trim());
      setOrderNumber('');
    }
  }, [orderNumber, onSearch]);

  const handleClear = useCallback(() => {
    setOrderNumber('');
    onClear?.();
    inputRef.current?.focus();
  }, [onClear]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          id="orderNumber"
          type="text"
          value={orderNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setOrderNumber(e.target.value)}
          placeholder="Scan or enter order #"
          disabled={isLoading}
          autoFocus
          className="block w-full pl-12 pr-24 py-5 bg-white text-black border-2 border-gray-200 rounded-2xl text-xl font-medium placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400"
          style={{ fontSize: '18px' }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {orderNumber && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors mr-1"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || !orderNumber.trim()}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}