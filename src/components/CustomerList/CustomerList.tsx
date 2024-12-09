// src/components/CustomerList/CustomerList.tsx
import React from "react";
import { Customer } from "../../types/customer";
import { useCustomers } from "../../hooks/useCustomers";
import { CustomerListItem } from "./CustomerListItem";

interface Props {
  onEdit: (customer: Customer) => void;
}

export const CustomerList: React.FC<Props> = ({ onEdit }) => {
  const { customers, isLoading, error, deleteCustomer } = useCustomers();

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <div className="divide-y divide-gray-200">
        {customers.map((customer) => (
          <CustomerListItem
            key={customer.id}
            customer={customer}
            onDelete={deleteCustomer}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};
