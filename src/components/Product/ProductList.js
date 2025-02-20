import React, { useState, useEffect } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../UI/LoadingSpinner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Use the full API URL to avoid errors
        const response = await axios.get("http://127.0.0.1:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <h2 className="text-center my-4">🛒 Products</h2>

      {/* ✅ Show error message if API request fails */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              {/* ✅ Ensure price is always formatted properly */}
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductList;
