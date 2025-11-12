export const initialState = {
  cars: [],
  filtered: [],
  user: null
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_CARS':
      return { ...state, cars: action.payload };
    case 'SET_FILTERED':
      return { ...state, filtered: action.payload };
    case 'FILTER_BY_PRICE': {
       const priceInput = action.payload;
       if (priceInput === '' || priceInput === null) {
       return { ...state, filtered: state.cars };
     }

    const p = parseFloat(priceInput);
     if (isNaN(p)) {
    // nếu người dùng nhập không phải số → hiển thị tất cả
     return { ...state, filtered: state.cars };
    }

  // lọc những xe có giá nhỏ hơn hoặc bằng giá nhập vào
    const filtered = state.cars.filter((c) => Number(c.price) <= p);
     return { ...state, filtered };
  }
    case 'REGISTER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
