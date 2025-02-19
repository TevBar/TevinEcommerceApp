import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProductConfirmModal = ({ show, onHide, onConfirm, message }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <p>{message}</p>
        <Button variant="danger" onClick={onConfirm}>Confirm</Button>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
      </Modal.Body>
    </Modal>
  );
};

export default ProductConfirmModal;
