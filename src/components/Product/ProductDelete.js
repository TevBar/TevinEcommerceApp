import React, { useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { deleteProduct } from "../../services/products";

const ProductDelete = ({ productId, onDeleteSuccess }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      onDeleteSuccess(productId);  // Updates the UI after deletion
      setShow(false);
    } catch (err) {
      setError("Error deleting product. Please try again.");
    }
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShow(true)}>Delete</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDelete;
