/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { submitPaymentTokenId as submitPaymentTokenIdAction } from '../../actions/payment';
import { cancelOrder as cancelOrderAction, fetchAllOrders as fetchAllOrdersAction, } from '../../actions/order';
import {
  deleteCartItem as deleteCartItemAction,
  fetchCartItems as fetchCartItemsAction,
  updateCartItemQty as updateCartItemQtyAction,
} from '../../actions/cart';
import Home from './components/Home';

/**
 *
 * @param fetchCartItems {action} to get all cart Items
 * @param fetchAllOrders {action} to get all orders
 * @param updateCartItemQty {action} to update cart item quantity status
 * @param deleteCartItem {action} to delete item from cart
 * @param cancelOrder {action} cancelling an order
 * @param userData {object} contains signed in user info,
 * must have 'username' attribute as it is used for payment
 * @param cartItems {array|object} contains cart items
 * @param cartItemsInfo {array} info of all items present in the cart
 * @param currentOrder {object} keeps track of the current order/pending order in-case if any
 * @param paymentComplete {bool} payment status
 * @param paymentInProgress {bool} payment progress status
 * @param history {object} react router history object for redirecting
 * @returns {*}
 * @constructor
 */
const CartModule = ({
  fetchCartItems, fetchAllOrders, updateCartItemQty, deleteCartItem, cancelOrder,
  userData,
  cartItems, cartItemsInfo,
  currentOrder,
  paymentComplete, paymentInProgress,
  history,
}) => (
  <Home
    /* All the functions passed */
    fetchCartItems={fetchCartItems}
    fetchAllOrders={fetchAllOrders}
    updateCartItemQty={updateCartItemQty}
    deleteCartItem={deleteCartItem}
    cancelOrder={cancelOrder}

    /* User data prop to access username while making payment */
    userData={userData}

    /* Cart Items */
    cartItems={cartItems}
    cartItemsInfo={cartItemsInfo}

    /* Current Order track, has the pendingOrder info in-case if any */
    currentOrder={currentOrder}

    /* Payment status track */
    paymentComplete={paymentComplete}
    paymentInProgress={paymentInProgress}

    /* router history object to change route */
    history={history}
  />);


CartModule.propTypes = {
  userData: PropTypes.object.isRequired,

  cartItems: PropTypes.arrayOf(PropTypes.shape({
    groceryId: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
  cartItemsInfo: PropTypes.array.isRequired,

  currentOrder: PropTypes.object.isRequired,


  paymentComplete: PropTypes.bool.isRequired,
  paymentInProgress: PropTypes.bool.isRequired,

  fetchCartItems: PropTypes.func.isRequired,
  fetchAllOrders: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  updateCartItemQty: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired,
};


function initMapStateToProps(state) {
  return {
    userData: state.auth.userData,
    cartItems: state.cart.cartData || [],
    cartItemsInfo: state.cart.cartItemsInfo || [],
    currentOrder: state.order.currentOrder || {},
    paymentComplete: state.payment.paymentComplete,
    paymentInProgress: state.payment.paymentInProgress || false,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCartItems: fetchCartItemsAction,
    fetchAllOrders: fetchAllOrdersAction,
    cancelOrder: cancelOrderAction,
    deleteCartItem: deleteCartItemAction,
    updateCartItemQty: updateCartItemQtyAction,
    submitPaymentTokenId: submitPaymentTokenIdAction,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(CartModule);
