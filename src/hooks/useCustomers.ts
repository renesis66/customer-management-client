// src/hooks/useCustomers.ts
import { useState, useEffect } from "react";
import { Customer, CustomerInput } from "../types/customer";
import { customerApi } from "../api/customerApi";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await customerApi.getAllCustomers();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch customers");
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomer = async (customerData: CustomerInput) => {
    try {
      console.log("Adding customer ", customerData);
      const newCustomer = await customerApi.createCustomer(customerData);
      setCustomers((prev) => [...prev, newCustomer]);
      // Then refresh to ensure we're in sync
      fetchCustomers();
      return newCustomer;
    } catch (err) {
      throw new Error("Failed to create customer");
    }
  };

  const updateCustomer = async (
    id: string,
    customerData: Partial<CustomerInput>
  ) => {
    try {
      console.log("Updating customer data ", customerData);
      const updatedCustomer = await customerApi.updateCustomer(
        id,
        customerData
      );
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === id ? updatedCustomer : customer
        )
      );
      return updatedCustomer;
    } catch (err) {
      throw new Error("Failed to update customer");
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      console.log("Deleting customer ", id);
      await customerApi.deleteCustomer(id);
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    } catch (err) {
      throw new Error("Failed to delete customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    isLoading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    refreshCustomers: fetchCustomers,
  };
};
