import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import PaymentList from "../components/PaymentList";

export default function HomePage() {
  const { state, fetchPaymentsForUser } = useContext(AppContext);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (state.user) {
      fetchPaymentsForUser(state.user.id);
    }
  }, [state.user]);

  useEffect(() => {
    setFiltered(state.payments);
  }, [state.payments]);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card className="p-3 mb-3">
          <FilterBar payments={state.payments} onFiltered={(list) => setFiltered(list)} />
        </Card>

        <Row>
          <Col>
            <PaymentList payments={filtered} loading={state.loading} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
