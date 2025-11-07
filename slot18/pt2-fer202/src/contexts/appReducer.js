export const initialState = {
  user: null,
  token: null,
  payments: [],
  loading: false,
  error: null
};

export function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload.user, token: action.payload.token, error: null };
    case "LOGOUT":
      return { ...initialState };
    case "SET_PAYMENTS":
      return { ...state, payments: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
