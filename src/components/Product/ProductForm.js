import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const ProductForm = ({ existingProduct, onSuccess }) => {
  const [product, setProduct] = useState(
    existingProduct || { name: "", price: "" }
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      if (existingProduct?.id) {
        await axios.put(`http://127.0.0.1:5000/api/products/${existingProduct.id}`, product);
      } else {
        await axios.post("http://127.0.0.1:5000/api/products", product);
      }
      setSuccess("Product saved successfully!");
      if (onSuccess) onSuccess();  // ✅ Ensures it doesn’t throw an error if undefined
    } catch (err) {
      setError("Error saving product. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group controlId="productName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="productPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        {existingProduct?.id ? "Update Product" : "Add Product"}
      </Button>
    </Form>
  );
};

export default ProductForm;
