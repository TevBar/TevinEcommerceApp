import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../UI/LoadingSpinner";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (customerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/customers/${customerId}`);
      setCustomers(customers.filter(customer => customer.id !== customerId)); // Update UI
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <h2 className="text-center my-4">👥 Customers</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th> {/* Added column for delete button */}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(customer.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CustomerList;
