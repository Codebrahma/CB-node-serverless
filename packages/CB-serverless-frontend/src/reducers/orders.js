const initialState = {
  currentOrder: null,
  orderList: [],
};

export default (state = initialState, { type, payload = {}, ...rest }) => {
  switch (type) {
    case 'SAVE_ORDER_ID':
      return {
        ...state,
        currentOrder: payload,
      };
    case 'SAVE_ALL_ORDERS':
      return {
        ...state,
        orderList: payload,
        currentOrder: rest.pendingOrder,
      };
    case 'CLEAR_ORDER':
      return {
        ...state,
        currentOrder: [],
        orderList: [],
      };
    default:
      return state;
  }
};
