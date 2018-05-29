import { put, call, select, takeLatest } from 'redux-saga/effects';
import CartService from '../../../service/cart';

const userIdSelector = state => state.auth.userData && state.auth.userData.username;
const { updateCart } = CartService;

function* cartItemsClean(action) {
  try {
    const userId = yield select(userIdSelector);
    let newCart = [];
    const response = yield call(() => updateCart(userId, newCart));
    yield put({ type: 'FETCH_CART_ITEMS' });
  } catch (e) {
    console.log(e);
  }
}

function* cartItemsCleanSaga() {
  yield takeLatest('CLEAN_CART_ITEMS', cartItemsClean);
}

export default cartItemsCleanSaga;
