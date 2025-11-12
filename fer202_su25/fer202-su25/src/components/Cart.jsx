import React from 'react';
import { useCart } from '../context/CartContext';
import { Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Alert variant="info">
        Your cart is empty. <Link to="/motorbikes">Go shopping!</Link>
      </Alert>
    );
  }

  return (
    <>
      <h2>Shopping Cart</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.brand} {item.model}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  −
                </Button>{' '}
                {item.quantity}{' '}
                <Button
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </td>
              <td>${item.price}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total Amount: ${total}</h4>
      <Link to="/motorbikes">
        <Button variant="secondary">Continue Shopping</Button>
      </Link>
    </>
  );
};

export default Cart;