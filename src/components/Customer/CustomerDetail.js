import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/CustomerStyles.css";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`/api/customers/${id}`)
      .then((response) => setCustomer(response.data))
      .catch((error) => console.error("Error fetching customer:", error));
  }, [id]);

  if (!customer) return <p>Loading customer details...</p>;

  return (
    <div className="customer-details-container">
      <h2>Customer Details</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
    </div>
  );
};

export default CustomerDetails;
