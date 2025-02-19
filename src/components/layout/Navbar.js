import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Custom styling

const AppNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🛒 E-Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
