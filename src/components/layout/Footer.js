import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

const Footer = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const customerRes = await axios.get("/api/customers");
        const productRes = await axios.get("/api/products");
        setCustomerCount(customerRes.data.length);
        setProductCount(productRes.data.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <footer className="bg-dark text-light text-center py-3 mt-4">
      <Container>
        <p>&copy; {new Date().getFullYear()} Tevin Barrios/BarriosTevin@gmail.com Your E-Commerce. All rights reserved.</p>
        <p>📊 {customerCount} Customers | 🛒 {productCount} Products</p>
      </Container>
    </footer>
  );
};

export default Footer;
