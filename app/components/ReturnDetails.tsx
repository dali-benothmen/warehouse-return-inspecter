import React from "react"
import { CustomerReturn } from "../types/returns";

type ReturnDetailsProps = {
  returnData: CustomerReturn;
};

export const ReturnDetails = ({ returnData }: ReturnDetailsProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Return Details
        </h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${returnData.status === 'open' ? 'bg-blue-100 text-blue-800' :
          returnData.status === 'closed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
          {returnData.status.toUpperCase()}
        </span>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Order Number</label>
          <p className="text-xl font-bold text-gray-900">{returnData.order_number}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">RMA Number</label>
          <p className="text-xl font-bold text-gray-900 font-mono">{returnData.rma}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Customer</label>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              {returnData.customer.full_name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{returnData.customer.full_name}</p>
              <p className="text-sm text-gray-500">{returnData.customer.email}</p>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Total Refund</label>
          <p className="text-xl font-bold text-gray-900">{returnData.total_amount} <span className="text-sm font-normal text-gray-500">{returnData.currency}</span></p>
        </div>
      </div>
    </div>
  );
}