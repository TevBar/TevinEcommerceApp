import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const Footer = () => {
  const [counts, setCounts] = useState({ customers: 0, products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/counts"); // Ensure correct API URL
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <footer className="bg-dark text-white py-3 mt-4">
      <Container className="text-center">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <p>
            📊 Customers: {counts.customers} | 🛒 Products: {counts.products} | 📦 Orders: {counts.orders}
          </p>
        )}
      </Container>
    </footer>
  );
};

export default Footer;
