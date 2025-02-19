import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const CustomerForm = ({ existingCustomer, onSuccess }) => {
  const [customer, setCustomer] = useState(
    existingCustomer || { name: "", email: "", phone: "" }
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    try {
      if (existingCustomer?.id) {
        await axios.put(`http://127.0.0.1:5000/api/customers/${existingCustomer.id}`, customer);
      } else {
        await axios.post("http://127.0.0.1:5000/api/customers", customer);
      }
      setSuccess("Customer saved successfully!");
      if (onSuccess) onSuccess();  // ✅ Ensures it doesn’t throw an error if undefined
    } catch (err) {
      setError("Error saving customer. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form.Group controlId="customerName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="customerEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="customerPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        {existingCustomer?.id ? "Update Customer" : "Add Customer"}
      </Button>
    </Form>
  );
};

export default CustomerForm;
