import { put, call, select, takeLatest } from 'redux-saga/effects';
import CartService from '../../../service/cart';
import { deDupeItems } from '../../../utils/array';

const userIdSelector = state => state.auth.userData && state.auth.userData.username;
const cartItemsSelector = state => state.cart.cartData || [];
const { updateCart } = CartService;

function* cartItemsAdd(action) {
  try {
    const userId = yield select(userIdSelector);
    let currentCart = yield select(cartItemsSelector);
    let newCart = [];
    newCart = deDupeItems([...currentCart, ...[action.payload]]);
    const response = yield call(() => updateCart(userId, newCart));
    const { resp } = response.data ? response.data : {};
    yield put({ type: 'FETCH_CART_ITEMS' });
  } catch (e) {
    console.log(e);
  }
}

function* cartItemsAddSaga() {
  yield takeLatest('UPDATE_CART_ITEMS', cartItemsAdd);
}

export default cartItemsAddSaga;
