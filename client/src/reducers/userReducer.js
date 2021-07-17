const initialState = {
  alluser: null,
  cart: [],
  products: {
    isLoaded: false,
    data: [],
  },
};

export default function userReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case "ALL_USER":
      return { ...state, alluser: action.payload.alluser }

    default:
      return state;
  }
}
