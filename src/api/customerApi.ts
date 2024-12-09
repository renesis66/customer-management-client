// src/api/customerApi.ts
import axios from "axios";
import { Customer, CustomerInput } from "../types/customer";

const API_BASE_URL = "http://localhost:3000/api";

export const customerApi = {
  async getAllCustomers(): Promise<Customer[]> {
    const response = await axios.get(`${API_BASE_URL}/customers`);
    return response.data;
  },

  async getCustomer(id: string): Promise<Customer> {
    const response = await axios.get(`${API_BASE_URL}/customers/${id}`);
    return response.data;
  },

  async createCustomer(customer: CustomerInput): Promise<Customer> {
    const response = await axios.post(`${API_BASE_URL}/customers`, customer);
    return response.data;
  },

  async updateCustomer(
    id: string,
    customer: Partial<CustomerInput>
  ): Promise<Customer> {
    const response = await axios.put(
      `${API_BASE_URL}/customers/${id}`,
      customer
    );
    return response.data;
  },

  async deleteCustomer(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/customers/${id}`);
  },
};
