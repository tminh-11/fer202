import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

export default function Store() {
  const { state, dispatch } = useContext(AppContext);

  const buyProduct = async (product) => {
    if (product.stock <= 0) {
      alert('Out of stock');
      return;
    }

    // 1) Optimistic UI: update local state first
    dispatch({ type: 'ADD_TO_CART', payload: product });

    // 2) Call JSON server to decrease stock: find store, update product by id
    try {
      // fetch current product from server to ensure stock is current
      const res = await fetch(`http://localhost:9999/store`);
      if (!res.ok) throw new Error('Fetch store failed');
      const data = await res.json();
      const serverProduct = data.products.find((p) => p.id === product.id);
      if (!serverProduct) throw new Error('Product not found on server');

      if (serverProduct.stock <= 0) {
        alert('Oops — another user bought the last one. Refreshing...');
        // refresh products from server
        // replace local products with server list
        dispatch({ type: 'SET_PRODUCTS', payload: data.products });
        return;
      }

      const updated = { ...serverProduct, stock: serverProduct.stock - 1 };
      // JSON Server: to update nested resource we PATCH to /store with updated products array
      // Simpler approach: fetch the whole store, replace products array with updated item and PUT
      const newProducts = data.products.map((p) => (p.id === product.id ? updated : p));
      const newStore = { ...data, products: newProducts };

      const putRes = await fetch('http://localhost:9999/store', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
      if (!putRes.ok) throw new Error('Failed to update server');

      // update local copy with server updated product
      dispatch({ type: 'SET_PRODUCTS', payload: newProducts });
    } catch (err) {
      console.error(err);
      alert('Error updating product on server. Please try refresh.');
    }
  };

  return (
    <div>
      <h2>Store</h2>
      {state.products.length === 0 ? (
        <Alert variant="info">Loading products...</Alert>
      ) : (
        <Row>
          {state.products.map((p) => (
            <Col md={4} key={p.id}>
              <ProductCard product={p} onBuy={buyProduct} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
