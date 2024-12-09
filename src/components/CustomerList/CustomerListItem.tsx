// src/components/CustomerList/CustomerListItem.tsx
import React from "react";
import { Customer } from "../../types/customer";

interface Props {
  customer: Customer;
  onDelete: (id: string) => Promise<void>;
  onEdit: (customer: Customer) => void;
}

export const CustomerListItem: React.FC<Props> = ({
  customer,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="py-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">
          {customer.firstName} {customer.lastName}
        </h3>
        <p className="text-gray-600">{customer.email}</p>
        <p className="text-gray-600">{customer.phone}</p>
      </div>
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onEdit(customer)}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => onDelete(customer.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
