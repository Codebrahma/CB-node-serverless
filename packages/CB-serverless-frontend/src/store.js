import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import authReducer from './Auth/authReducer';
import cart from './modules/Cart/reducers/cart';
import rootSaga from './sagas';
import payment from './reducers/payment';
import order from './reducers/orders';

const logger = createLogger({});
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  cart,
  order,
  payment,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);

sagaMiddleware.run(rootSaga);

export default store;
