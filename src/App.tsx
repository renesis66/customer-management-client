// src/App.tsx
import React, { useState } from "react";
import { CustomerList } from "./components/CustomerList/CustomerList";
import { CustomerForm } from "./components/CustomerForm/CustomerForm";
import { Customer, CustomerInput } from "./types/customer";
import { useCustomers } from "./hooks/useCustomers";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const { createCustomer, updateCustomer } = useCustomers();

  const handleCreateOrUpdateCustomer = async (data: CustomerInput) => {
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, data);
      } else {
        await createCustomer(data);
      }
      setIsModalOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      console.error("Failed to save customer:", error);
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <button
          onClick={() => {
            setEditingCustomer(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Customer
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingCustomer ? "Edit Customer" : "Add New Customer"}
            </h2>
            <CustomerForm
              onSubmit={handleCreateOrUpdateCustomer}
              initialData={editingCustomer || undefined}
            />
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingCustomer(null);
              }}
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <main>
        <CustomerList onEdit={handleEditCustomer} />
      </main>
    </div>
  );
};

export default App;
