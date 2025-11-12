import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ProductCard({ product, onBuy }) {
  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img variant="top" src={product.img} style={{ height: '180px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <div>Category: {product.category}</div>
          <div>Price: {product.price.toLocaleString()} VND</div>
          <div>Stock: {product.stock}</div>
        </Card.Text>
        <Button variant="primary" onClick={() => onBuy(product)} disabled={product.stock <= 0}>
          {product.stock > 0 ? 'Buy' : 'Sold out'}
        </Button>
      </Card.Body>
    </Card>
  );
}
