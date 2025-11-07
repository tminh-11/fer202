import React, { useContext, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import { PaymentContext } from "../contexts/PaymentContext";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import PaymentList from "../components/PaymentList";

export default function HomePage() {
  const { state: appState } = useContext(AppContext);
  const {
    state: payState,
    fetchPayments,
    applyFilterAndSort,
  } = useContext(PaymentContext);

  useEffect(() => {
    if (appState.user) {
      fetchPayments(appState.user.id);
    }
  }, [appState.user]);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card className="p-3 mb-3">
          <FilterBar onFilterChange={applyFilterAndSort} />
        </Card>
        <PaymentList payments={payState.filteredPayments} loading={payState.loading} />
      </Container>
    </>
  );
}
