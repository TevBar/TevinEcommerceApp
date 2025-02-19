import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const OrderForm = ({ onSuccess }) => {
  const [order, setOrder] = useState({ customerId: "", productId: "", quantity: 1 });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!order.customerId || !order.productId || !order.quantity) {
      setError("All fields are required!");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/api/orders", order);
      setSuccess(true);
      setOrder({ customerId: "", productId: "", quantity: 1 });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to create order.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Create Order</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Order placed successfully!</Alert>}

      <Form.Group controlId="customerId">
        <Form.Label>Customer ID</Form.Label>
        <Form.Control type="text" name="customerId" value={order.customerId} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="productId">
        <Form.Label>Product ID</Form.Label>
        <Form.Control type="text" name="productId" value={order.productId} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" name="quantity" value={order.quantity} onChange={handleChange} />
      </Form.Group>

      <Button type="submit" variant="primary" className="mt-3">Create Order</Button>
    </Form>
  );
};

export default OrderForm;
