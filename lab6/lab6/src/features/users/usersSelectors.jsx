import { createSelector } from '@reduxjs/toolkit';

const selectUsersState = state => state.users;

export const selectUserList = createSelector(
  selectUsersState,
  users => users.list
);

export const selectFilteredUsers = createSelector(
  selectUsersState,
  users => users.filteredUsers
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  users => users.isLoading
);

export const selectUsersError = createSelector(
  selectUsersState,
  users => users.error
);