import React from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">
          <h4>Your Cart is Empty</h4>
          <Link to="/mobiles" className="btn btn-primary">Continue Shopping</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Shopping Cart</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Mobile</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.qty}</td>
              <td>${item.price * item.qty}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total: ${total}</h4>
      <Link to="/mobiles">
        <Button variant="secondary">Continue Shopping</Button>
      </Link>
    </Container>
  );
};

export default CartPage;