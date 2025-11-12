export const initialState = {
  store: { name: '', location: '' },
  products: [],
  cart: [],
  user: null
};

export default function appReducer(state, action) {
  switch (action.type) {
    case 'SET_STORE':
      return { ...state, store: { ...state.store, ...action.payload } };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, cart: [] };
    case 'ADD_TO_CART': {
      const product = action.payload;
      const existing = state.cart.find((c) => c.id === product.id);
      let newCart;
      if (existing) {
        newCart = state.cart.map((c) => (c.id === product.id ? { ...c, qty: c.qty + 1 } : c));
      } else {
        newCart = [...state.cart, { ...product, qty: 1 }];
      }
      // update local products list (decrease stock by 1)
      const newProducts = state.products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      );
      return { ...state, cart: newCart, products: newProducts };
    }
    case 'DECREASE_STOCK_LOCAL': {
      const id = action.payload;
      const newProducts = state.products.map((p) => (p.id === id ? { ...p, stock: p.stock - 1 } : p));
      return { ...state, products: newProducts };
    }
    case 'SET_PRODUCTS_SINGLE': {
      // replace single product in products array (payload: product)
      const prod = action.payload;
      const newProducts = state.products.map((p) => (p.id === prod.id ? prod : p));
      return { ...state, products: newProducts };
    }
    default:
      return state;
  }
}
