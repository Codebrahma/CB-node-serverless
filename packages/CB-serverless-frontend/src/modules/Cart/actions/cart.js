export const fetchCartItems = () => ({
  type: 'FETCH_CART_ITEMS',
});

export const updateCartItems = (id, qty) => ({
  type: 'UPDATE_CART_ITEMS',
  payload: {
    groceryId: id,
    qty,
  },
});

export const updateCartItemQty = (id, qty) => ({
  type: 'UPDATE_CART_ITEM_QTY',
  payload: {
    groceryId: id,
    qty,
  },
});

export const deleteCartItem = id => ({
  type: 'DELETE_CART_ITEM',
  payload: id,
});

export const saveNewCart = data => ({
  type: 'SAVE_NEW_CART',
  payload: data,
});


export const saveItemInfoToCart = data => ({
  type: 'SAVE_ITEM_INFO',
  payload: data,
});

export const cleanCart = () => {
  return {
    type: 'CLEAN_CART_ITEMS',
  };
};
