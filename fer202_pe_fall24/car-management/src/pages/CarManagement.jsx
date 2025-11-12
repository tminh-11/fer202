import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function CarManagement() {
  const { state, dispatch } = useContext(AppContext);
  const [priceSearch, setPriceSearch] = useState('');

  useEffect(() => {
    // set filtered initially to all cars if not set
    if (state.cars.length && state.filtered.length === 0) {
      dispatch({ type: 'SET_FILTERED', payload: state.cars });
    }
  }, [state.cars]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'FILTER_BY_PRICE', payload: priceSearch });
  };

  const handleLiveChange = (val) => {
    setPriceSearch(val);
    // update as user types (dynamic)
    if (val === '') {
      dispatch({ type: 'SET_FILTERED', payload: state.cars });
    } else {
      dispatch({ type: 'FILTER_BY_PRICE', payload: val });
    }
  };

  return (
    <div>
      <h3>Car Management</h3>
      <p>Welcome <strong>{state.user?.username}</strong></p>

      <Card className="mb-3 p-3">
        <Form onSubmit={handleSearch}>
          <InputGroup>
            <Form.Control
                type="number"  // thêm dòng này
                placeholder="Enter max price (e.g. 30000)"
                value={priceSearch}
                onChange={(e) => handleLiveChange(e.target.value)}
            />
            <Button variant="primary" type="submit">Search</Button>
            <Button variant="outline-secondary" onClick={() => { setPriceSearch(''); dispatch({ type: 'SET_FILTERED', payload: state.cars }); }}>Clear</Button>
          </InputGroup>
        </Form>
      </Card>

      <Row>
        {state.filtered && state.filtered.length > 0 ? (
          state.filtered.map((car) => (
            <Col md={6} lg={4} key={car.id} className="mb-4">
              <Card>
                <div style={{ height: 200, overflow: 'hidden' }}>
                  <Card.Img variant="top" src={car.image || 'https://via.placeholder.com/600x400'} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <Card.Body>
                  <Card.Title>{car.make} {car.model}</Card.Title>
                  <Card.Text>
                    <div>Year: {car.year}</div>
                    <div>Price: ${car.price.toLocaleString()}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <div className="alert alert-info">No cars match the filter or loading data...</div>
          </Col>
        )}
      </Row>
    </div>
  );
}
