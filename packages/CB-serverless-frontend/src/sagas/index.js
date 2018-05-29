import { fork } from 'redux-saga/effects';
import attemptLoginSaga from './attemptLoginSaga';
import verifyUserSaga from './verifyUserSaga';
import forgotPasswordRequestSaga from './forgotPasswordRequestSaga';
import forgotPasswordSaga from './forgotPasswordSaga';
import requestVerificationCodeSaga from './requestVerificationCodeSaga';
import cartItemsFetchSaga from '../modules/Cart/sagas/cartItemsFetchSaga';
import cartItemsAddSaga from '../modules/Cart/sagas/cartItemsAddSaga';
import cartItemsDeleteSaga from '../modules/Cart/sagas/cartItemsDeleteSaga';
import cartItemUpdateQtySaga from '../modules/Cart/sagas/cartItemsUpdateQtySaga';
import cartItemsCleanSaga from '../modules/Cart/sagas/cartItemsCleanSaga';
import placeOrderSaga from './placeOrderSaga';
import cleanOrderSaga from './cleanOrderSaga';
import paymentTokenIdSubmitSaga from './paymentTokenIdSubmitSaga';
import fetchOrderSaga from './fetchAllOrdersSaga';
import cancelOrderSaga from './cancelOrderSaga';

function* rootSaga() {
  yield fork(attemptLoginSaga);
  yield fork(verifyUserSaga);
  yield fork(forgotPasswordRequestSaga);
  yield fork(forgotPasswordSaga);
  yield fork(cartItemsFetchSaga);
  yield fork(cartItemsAddSaga);
  yield fork(cartItemsDeleteSaga);
  yield fork(cartItemUpdateQtySaga);
  yield fork(cartItemsCleanSaga);
  yield fork(placeOrderSaga);
  yield fork(cleanOrderSaga);
  yield fork(paymentTokenIdSubmitSaga);
  yield fork(fetchOrderSaga);
  yield fork(cancelOrderSaga);
  yield fork(requestVerificationCodeSaga);
}

export default rootSaga;
