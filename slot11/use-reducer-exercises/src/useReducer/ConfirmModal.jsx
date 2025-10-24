import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, title, message, onConfirm }) {
  return (
    <Modal show={show} onHide={onConfirm} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
