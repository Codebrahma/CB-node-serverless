/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';


import Quantity from '../../../base_components/Quantity';
import CartItemSkeleton from './CartItemSkeleton';
import { CartItemWrap, DeleteIconWrap, ItemImage, ItemTitle, SoldOutError } from './StyledComponents';

class CartItem extends PureComponent {
  displayName = 'CartItem Component';

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      hasError: false,
      errorInfo: null,
    };
  }


  componentDidMount() {
    const { info } = this.props;
    if (!this.state.data && info) {
      this.setState((s, p) => ({
        data: info,
      }));
    }
  }

  /**
   * Lifecycle event to handle any error while displaying the cart item
   * @param error
   * @param info
   */
  componentDidCatch(error, info) {
    this.setState((s, p) => ({
      hasError: true,
      errorInfo: info,
    }));
    console.log(this.displayName, error, info);
  }


  showSoldOutMessage = (availableQty) => {
    if (availableQty < this.props.qty) {
      return (
        <SoldOutError>
        Item is Sold Out
        </SoldOutError>);
    }
    return null;
  };

  renderDeleteIcon = () => (
    <DeleteIconWrap>
      <IconButton
        iconStyle={{
          color: '#aaa',
          fontSize: 28,
        }}
        onClick={() => this.props.onDelete(this.props.id)}
        iconClassName="material-icons"
      >delete
      </IconButton>
    </DeleteIconWrap>);


  render() {
    const { data } = this.state;

    /**
     *  handle any error in component and render a error message
     */
    if (this.state.hasError) {
      return (
        <CartItemWrap>
          Some error occured, cart item cant be displayed. ({this.state.errorInfo})
        </CartItemWrap>
      );
    }


    /**
     * if data object from state, is empty or have a non-empty name return a skeleton loading effect
     */
    if (!data || !data.name) {
      return (<CartItemSkeleton />);
    }

    /**
     * Everything looks fine render the real component and show all info
     */
    return (
      <CartItemWrap>

        <ItemImage
          src={data.url}
          alt={data.name}
        />

        <ItemTitle>
          {data.name}
          {
            /**
             * show the sold out message on cart Item if the quantity in cart is less
             * than server sent available Quantity
             * Not a validation, a UI warning message
             */
            this.showSoldOutMessage()
          }
        </ItemTitle>


        <Quantity
          size={40}
          onChange={qty => this.props.onQtyChange(this.props.id, qty)}
          initialQuantity={this.props.qty}
        />

        {
          /**
           * Render cartItem delete from cart button
           */
          this.renderDeleteIcon
        }

      </CartItemWrap>
    );
  }
}

CartItem.defaultProps = {
  info: null,
};

CartItem.propTypes = {
  qty: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  info: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onQtyChange: PropTypes.func.isRequired,
};

export default CartItem;
