import { call, put, select, takeLatest } from 'redux-saga/effects';
import CartService from '../../../service/cart';

const userIdSelector = state => state.auth.userData && state.auth.userData.username;
const { getCart, getCartDetails } = CartService;

function* cartItemsFetch(action) {
  try {
    const userId = yield select(userIdSelector);
    const response = yield call(() => getCart(userId));
    let cartDetails = yield call(() => getCartDetails(userId));
    cartDetails = cartDetails.data.length > 0 ? cartDetails.data : [];

    const { cartData } = response.data.Item ? response.data.Item : [];
    yield put({
      type: 'USER_CART_ITEMS',
      payload: {
        cartData,
      },
    });

    yield put({
      type: 'SAVE_ITEM_INFO',
      payload: cartDetails || [],
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: 'USER_CART_ITEMS',
      payload: {
        cartData: [],
      },
    });

    yield put({
      type: 'SAVE_ITEM_INFO',
      payload: [],
    });
  }
}

function* cartItemsFetchSaga() {
  yield takeLatest('FETCH_CART_ITEMS', cartItemsFetch);
}

export default cartItemsFetchSaga;
