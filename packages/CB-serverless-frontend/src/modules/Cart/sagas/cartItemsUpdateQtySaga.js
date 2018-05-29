import { call, put, select, takeLatest } from 'redux-saga/effects';
import CartService from '../../../service/cart';

const userIdSelector = state => state.auth.userData && state.auth.userData.username;
const cartItemsSelector = state => state.cart.cartData;

const { updateCart, getCartDetails } = CartService;

function* cartItemUpdateQty(action) {
  try {
    const userId = yield select(userIdSelector);
    const currentCart = yield select(cartItemsSelector);


    const newCart = currentCart.map((obj) => {
      if (obj.groceryId === action.payload.groceryId) {
        const newObj = obj;
        newObj.qty = action.payload.qty;
        return newObj;
      }
      return obj;
    });

    const response = yield call(() => updateCart(userId, newCart));
    const { resp } = response.data ? response.data : {};

    const cartDetails = yield call(() => getCartDetails(userId));

    yield put({ type: 'SAVE_NEW_CART', payload: response.data.Attributes.cartData });

    yield put({
      type: 'SAVE_ITEM_INFO',
      payload: cartDetails.data || [],
    });
  } catch (e) {
    console.log(e);
  }
}

function* cartItemUpdateQtySaga() {
  yield takeLatest('UPDATE_CART_ITEM_QTY', cartItemUpdateQty);
}

export default cartItemUpdateQtySaga;
