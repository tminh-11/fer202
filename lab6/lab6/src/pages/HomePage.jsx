import React, { useEffect, useContext } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  fetchPayments,  applyFilterAndSort,} from "../features/payments/paymentsSlice";
import {  selectFilteredPayments,  selectPaymentsLoading,  selectPaymentsError,} from "../features/payments/paymentsSelectors";
import { AppContext } from "../contexts/AppContext";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import PaymentList from "../components/PaymentList";

export default function HomePage() {
  const dispatch = useDispatch();
  const { state: appState } = useContext(AppContext);

  const filteredPayments = useSelector(selectFilteredPayments);
  const loading = useSelector(selectPaymentsLoading);
  const error = useSelector(selectPaymentsError);

  useEffect(() => {
    if (appState.user?.id) {
      dispatch(fetchPayments(appState.user.id));
    }
  }, [appState.user, dispatch]);

  const handleFilterChange = (filter) => {
    dispatch(applyFilterAndSort(filter));
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card className="p-3 mb-3">
          <FilterBar onFilterChange={handleFilterChange} />
        </Card>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Đang tải danh sách thanh toán...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-danger my-5">
            <strong>Lỗi:</strong> {error}
          </div>
        )}

        {!loading && !error && (
          <PaymentList payments={filteredPayments} />
        )}
      </Container>
    </>
  );
}