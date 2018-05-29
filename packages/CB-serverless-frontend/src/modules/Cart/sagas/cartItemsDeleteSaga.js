import { call, put, select, takeLatest } from 'redux-saga/effects';
import CartService from '../../../service/cart';

const userIdSelector = state => state.auth.userData && state.auth.userData.username;
const cartItemsSelector = state => state.cart.cartData || [];
const { updateCart, getCartDetails } = CartService;

function* cartItemDelete(action) {
  try {
    const userId = yield select(userIdSelector);
    const currentCart = yield select(cartItemsSelector);

    const newCart = currentCart.filter(obj => obj.groceryId !== action.payload);

    const response = yield call(() => updateCart(userId, newCart));
    const { resp } = response.data ? response.data : {};

    let cartDetails = yield call(() => getCartDetails(userId));


    cartDetails = cartDetails.data.length > 0 ? cartDetails.data : [];


    yield put({ type: 'SAVE_NEW_CART', payload: response.data.Attributes.cartData });

    yield put({ type: 'SAVE_NEW_CART_INFO', payload: cartDetails || [] });
  } catch (e) {
    console.log(e);
  }
}

function* cartItemsDeleteSaga() {
  yield takeLatest('DELETE_CART_ITEM', cartItemDelete);
}

export default cartItemsDeleteSaga;
