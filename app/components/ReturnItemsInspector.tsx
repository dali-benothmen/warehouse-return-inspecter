"use client"

import React from "react"
import { ReturnItemCard } from "./ReturnItemCard";
import { ReturnItem } from "../types/returns";
import { MESSAGES } from "../lib/constants";

type ReturnItemsInspectorProps = {
  items: ReturnItem[];
  onUpdateItem: (itemId: number) => void;
};

export const ReturnItemsInspector = ({ items, onUpdateItem }: ReturnItemsInspectorProps) => {
  const pendingItems = items.filter(item => !item.is_inspected);
  const completedItems = items.filter(item => item.is_inspected);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 text-sm">
              {pendingItems.length}
            </span>
            Items to Inspect
          </h2>
        </div>

        {pendingItems.length === 0 && completedItems.length > 0 && (
          <div className="py-12 text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 mb-8">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-green-800 font-bold text-2xl mb-2">
              All Items Inspected!
            </h3>
            <p className="text-green-600 text-lg">
              {MESSAGES.READY_FOR_NEXT_SCAN}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {pendingItems.map((item, index) => (
            <ReturnItemCard
              key={item.id}
              item={item}
              onConfirm={onUpdateItem}
              itemNumber={index + 1}
            />
          ))}
        </div>
      </div>

      {completedItems.length > 0 && (
        <div className="pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-500 flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Completed Items ({completedItems.length})
          </h3>
          <div className="space-y-4 opacity-75 hover:opacity-100 transition-opacity">
            {completedItems.map(item => (
              <ReturnItemCard key={item.id} item={item} onConfirm={onUpdateItem} isCompleted />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
