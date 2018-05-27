/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


import CartItem from './CartItem';
import OrderButton from '../../../base_components/OrderButton';
import { CartHead, CartMain, CartWrapper, EmptyCart, OrderPending, RightSideContent } from './StyledComponents';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placingOrder: false,
      requestOpenPaymentModal: false,
      paymentModalOpened: false,
    };
  }

  componentDidMount() {
    this.props.fetchCartItems();
    this.props.fetchAllOrders();
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.paymentComplete) {
      this.props.history.push('/order-placed');
    }
  }


  onCartItemQtyChange = (id, qty) => {
    this.props.updateCartItemQty(id, qty);
  };

  onCartItemDelete = (id) => {
    this.props.deleteCartItem(id);
  };

  getItemInfo = (groceryId) => {
    const { cartItemsInfo } = this.props;
    if (!_.isNil(cartItemsInfo)) {
      return cartItemsInfo.findIndex(obj => obj.groceryId === groceryId);
    }
    return {};
  };

  doCheckout = () => {
    this.props.history.push('/checkout');
  };

  makeLastPayment = () => {
    const { currentOrder } = this.props;
    if (!_.isNil(currentOrder)) {
      this.displayPaymentModal(this.props);
    }
  };

  cancelLastOrder = () => {
    this.props.cancelOrder();
  };

  displayPaymentModal = (props) => {
    const checkoutHandler = window.StripeCheckout.configure({
      key: 'pk_test_rM2enW1rNROwx4ukBXGaIzhr',
      locale: 'auto',
    });
    checkoutHandler.open({
      name: `Pay Rs.${props.currentOrder.orderTotal}`,
      description: `Order: ${props.currentOrder.orderId}`,
      closed: () => {
        this.setState({ paymentModalOpened: false });
      },
      opened: () => {
        this.setState({ paymentModalOpened: true, requestOpenPaymentModal: false });
      },
      token: (token) => {
        if (token && token.id) {
          props.submitPaymentTokenId({
            tokenId: token.id,
            orderId: props.currentOrder.orderId,
            email: token.email,
            userId: props.userData.username,
          });
        } else {
          // to do
        }
      },
    });
  };

  renderCartItems = () => {
    const { cartItems, cartItemsInfo } = this.props;
    if (cartItems && cartItems.length > 0 && cartItemsInfo && cartItemsInfo.length > 0) {
      return cartItems.map((obj) => {
        const { groceryId, qty } = obj;
        const info = cartItemsInfo[this.getItemInfo(groceryId)];
        return (
          <CartItem
            key={groceryId}
            id={groceryId}
            qty={qty}
            info={info}
            onQtyChange={_.debounce(this.onCartItemQtyChange, 500)}
            onDelete={this.onCartItemDelete}
          />);
      });
    }
    return (
      <EmptyCart>Nothing in cart.</EmptyCart>
    );
  };

  renderPendingOrderSection = (isPending) => {
    if (isPending) {
      return (
        <RightSideContent>
          <OrderPending>
            <h3> You have a Order with payment pending.</h3>
            <p> What would you like to do?</p>

            <OrderButton
              backgroundColor="#32aef1"
              fullWidth
              disabled={this.props.paymentInProgress}
              title="Make Payment for last order"
              onClick={this.makeLastPayment}
            />

            <OrderButton
              backgroundColor="#ff8780"
              fullWidth
              title="Cancel Last Pending Order"
              onClick={this.cancelLastOrder}
            />
          </OrderPending>
        </RightSideContent>);
    }
    return null;
  };

  render() {
    const { currentOrder, cartItems } = this.props;
    const isAnyOrderPending = !_.isNil(currentOrder) && currentOrder.orderStatus === 'PAYMENT_PENDING';

    return (
      <CartWrapper>
        <CartMain>
          <CartHead>My Cart</CartHead>
          {this.renderCartItems()}
          {
            (isAnyOrderPending || (cartItems && cartItems.length > 0))
            &&
            <OrderButton
              overlayStyle={{
                width: '200px',
              }}
              title="Checkout &#10230;"
              disabled={isAnyOrderPending}
              onClick={this.doCheckout}
            />
          }
        </CartMain>
        {
          this.renderPendingOrderSection(isAnyOrderPending)
        }
      </CartWrapper>
    );
  }
}

Home.propTypes = {
  fetchCartItems: PropTypes.func.isRequired,
  fetchAllOrders: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  updateCartItemQty: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    groceryId: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
  // orderList: PropTypes.array.isRequired,
  cartItemsInfo: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  currentOrder: PropTypes.object.isRequired,
  paymentInProgress: PropTypes.bool.isRequired,
  paymentComplete: PropTypes.bool.isRequired,
};
