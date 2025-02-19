import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/products") // Fetch products from backend
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
        setLoading(false);
      });
  }, []);

  const handleAddProduct = () => {
    navigate("/products/add"); // Navigate to add product form
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Our Products</h1>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Available Products</h4>
        <Button variant="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
