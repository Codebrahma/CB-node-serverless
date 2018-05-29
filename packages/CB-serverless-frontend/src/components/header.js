/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { FlatButton, IconButton } from 'material-ui';
import { Auth } from 'aws-amplify';
import AppBar from 'material-ui/AppBar';
import { updateAuth } from '../Auth/actionCreators';
import { fetchCartItems } from '../modules/Cart/actions/cart';
import { fetchAllOrders } from '../actions/order';

const AppHeader = styled(AppBar)`
  position: fixed;
  top: 0;
  align-items: flex-start;
`;

const RightElementContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const LogoutButton = styled(FlatButton)`
  color: white !important;
`;

const CartItemsCount = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 15px;
  display: flex;
  font-size: 11px;
  height: 20px;
  justify-content: center;
  position: absolute;
  right:-1em;
  top: 0px;
  color: #000;
  width: 30px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const {orderListFetched, fetchAllOrders, fetchCartItems} = this.props;
    if (!orderListFetched) {
      fetchAllOrders();
    }
    fetchCartItems();
  }

  async handleLogout() {
    await Auth.signOut();
    this.resetInitialState();
  }

  resetInitialState = () => {
    this.props.updateAuth({
      isAuthenticating: false,
      isAuthenticated: false,
      identityId: null,
      userData: null,
    });
  };

  render() {
    const { cartData } = this.props;
    return (
      <AppHeader
        title={<span>Serverless Shopping App</span>}
        iconElementLeft={
          <Link
            to="/"
            href="/"
          >
            <IconButton
              iconStyle={{
                color: '#fff',
              }}
              iconClassName="material-icons"
            >home
            </IconButton>
          </Link>}
        iconElementRight={
          <RightElementContainer>
            <Link
              to="/cart"
              href="/cart"
              style={{
            position: 'relative',
            margin: '0 2em',
          }}
            >
              <IconButton
                iconStyle={{
            color: '#fff',
            fontSize: 28,
          }}
                iconClassName="material-icons"
              >add_shopping_cart
              </IconButton>
              {
            (cartData instanceof Array) &&
            cartData.length > 0 ? <CartItemsCount>{cartData.length}</CartItemsCount> : null
          }
            </Link>
            <LogoutButton label="logout" onClick={this.handleLogout} />
          </RightElementContainer>
        }
      />
    );
  }
}

Header.propTypes = {
  cartData: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticating: state.auth.isAuthenticating,
  isAuthenticated: state.auth.isAuthenticated,
  identityId: state.auth.identityId,
  userData: state.auth.userData,
  cartData: state.cart.cartData || [],
  orderListFetched: state.order.orderListFetched,
});

const mapDispatchToProps = dispatch => ({
  updateAuth: bindActionCreators(updateAuth, dispatch),
  fetchCartItems: bindActionCreators(fetchCartItems, dispatch),
  fetchAllOrders: bindActionCreators(fetchAllOrders, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
