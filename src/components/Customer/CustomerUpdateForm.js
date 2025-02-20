import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../styles/CustomerStyles.css";

const CustomerUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    axios.get(`/api/customers/${id}`)
      .then((response) => setCustomer(response.data))
      .catch((error) => console.error("Error fetching customer:", error));
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/api/customers/${id}`, customer);
      navigate("/customers");
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="customer-update-form-container">
      <h2>Update Customer</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={customer.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={customer.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" name="phone" value={customer.phone} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">Update Customer</Button>
      </Form>
    </div>
  );
};

export default CustomerUpdateForm;
