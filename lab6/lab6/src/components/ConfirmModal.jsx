import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, title, body, onClose }) {
  return (
    <Modal show={show} centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}
