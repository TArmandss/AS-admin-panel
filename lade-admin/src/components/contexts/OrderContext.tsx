// src/context/OrderContext.tsx
import React, { createContext, useContext } from "react";
import useSWR from "swr";
import { axiosInstance } from "../lib/axios";

// Define the shape of an order (customize as needed)
type Order = {
  id: string;
  _id: string;
  userName: string;
  paymentId: string;
  deliveryMethod: string;
  status: string;
  totalAmount: number;
};

// SWR fetcher function
const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);
// Context type
interface OrderContextType {
  orders: Order[] | undefined;
  isLoading: boolean;
  isError: any;
}

// Create context with proper type
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider component
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, error, isLoading } = useSWR<Order[]>("/all-orders", fetcher);


  return (
    <OrderContext.Provider value={{ orders: data, isLoading, isError: error }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
