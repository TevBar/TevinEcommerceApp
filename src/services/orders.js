import axios from "./api";

export const placeOrder = async (order) => {
  const response = await axios.post("/orders", order);
  return response.data;
};

export const getOrderHistory = async () => {
  const response = await axios.get("/orders");
  return response.data;
};

export const calculateOrderTotal = async (orderId) => {
  const response = await axios.get(`/orders/${orderId}/total`);
  return response.data;
};
