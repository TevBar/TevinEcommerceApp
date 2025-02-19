import React from "react";
import { Container } from "react-bootstrap";
import CustomerForm from "../components/Customer/CustomerForm";

const CustomerPage = () => {
  return (
    <Container>
      <h2>Manage Your Customer Account</h2>
      <CustomerForm existingCustomer={null} onSuccess={() => {}} />
    </Container>
  );
};

export default CustomerPage;
