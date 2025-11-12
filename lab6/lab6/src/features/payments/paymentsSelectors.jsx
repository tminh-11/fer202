import { createSelector } from '@reduxjs/toolkit';

const selectPaymentsState = state => state.payments;

export const selectPaymentList = createSelector(
  selectPaymentsState,
  payments => payments.list
);

export const selectFilteredPayments = createSelector(
  selectPaymentsState,
  payments => payments.filteredPayments
);

export const selectPaymentsLoading = createSelector(
  selectPaymentsState,
  payments => payments.isLoading
);

export const selectPaymentsError = createSelector(
  selectPaymentsState,
  payments => payments.error
);

export const selectSuccessfulPayments = createSelector(
  selectPaymentList,
  payments => payments.filter(p => p.status === 'SUCCESS')
);