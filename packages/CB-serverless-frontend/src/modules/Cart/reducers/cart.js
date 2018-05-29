const initialState = {
  cartData: [],
  cartItemsInfo: [],
};

export default (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case 'USER_CART_ITEMS':
      return {
        ...state,
        cartData: payload.cartData,
      };
    case 'SAVE_NEW_CART':
      return {
        ...state,
        cartData: payload,
      };
    case 'SAVE_ITEM_INFO':
      return {
        ...state,
        cartItemsInfo: payload,
      };
    case 'SAVE_NEW_CART_INFO':
      return {
        ...state,
        cartItemsInfo: payload,
      };
    default:
      return state;
  }
};
