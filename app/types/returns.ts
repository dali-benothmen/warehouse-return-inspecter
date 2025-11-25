export type ReturnItem = {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  is_arrived: boolean;
  is_inspected: boolean;
  return_reason: {
    reason_internal: string;
  };
};

export type CustomerReturn = {
  id: number;
  order_number: string;
  rma: number;
  status: string;
  total_amount: string;
  currency: string;
  customer: {
    full_name: string;
    email: string;
  };
  items: ReturnItem[];
};

export type ApiResponse = {
  customer_returns: CustomerReturn[];
};