/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { cleanCart } from '../modules/Cart/actions/cart';
import { cleanOrder } from '../actions/order';
import isEmpty from 'lodash/isEmpty';

const Container = styled.div`
  margin: 10% auto;
  width: 50%;
  border: 2px solid #669980;
  border-radius: 5px;
  padding-top: 2%;
  padding-bottom: 2%;
  background-color: white;
`;

const Heading = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #4db380;
`;

const OrderId = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #686b78;
  margin-top: 2%;
`;

const ListContainer = styled.div`
  padding: 5% 10%;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  justify-content: space-between;
  padding-bottom: 2%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
`;

const Item = styled.p`
  color: #686b78;
`;

class OrderPlaced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      orderId: null,
    };
  }

  componentWillMount() {
    const { cartItems, currentOrder } = this.props;
    if (isEmpty(cartItems) || isEmpty(currentOrder)) {
      // this.props.cleanCart();
      this.props.cleanOrder();
      this.props.history.push('/');
      return;
    }
    this.setState({
      cartItems: this.props.cartItems,
      orderId: this.props.currentOrder.orderId,
    }, () => {
      this.props.cleanCart();
      this.props.cleanOrder();
    });
  }

  render() {
    const { cartItems, orderId } = this.state;
    let totalAmount = 0;
    return (
      <Container>
        <Heading>
          Thanks for Shopping with us.
        </Heading>
        <OrderId>
          {`Order-Id ${orderId}`}
        </OrderId>
        <ListContainer>
          {
            cartItems.length > 0 &&
            cartItems.map(({ name, boughtQty, price }, index) => {
              totalAmount += price;
              return (
                <List key={index}>
                  <Section>
                    <Item>{name}</Item>
                    <Item>&nbsp;{`x ${boughtQty}`}&nbsp;</Item>
                  </Section>
                  <div>
                    <p>&#8377;{` ${price}`}&nbsp;</p>
                  </div>
                </List>
              );
            })
          }
          <hr />
          <List>
            <Section>
              <Item>Total</Item>
            </Section>
            <div>
              <p>&#8377;{` ${totalAmount}`}&nbsp;</p>
            </div>
          </List>
        </ListContainer>
        <RaisedButton
          label="Continue Shopping"
          primary
          buttonStyle={{ backgroundColor: '#008040', width: '100%' }}
          onClick={() => this.props.history.push('/')}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItemsInfo,
  currentOrder: state.order.currentOrder,
});

const mapDispatchToProps = dispatch => ({
  cleanCart: bindActionCreators(cleanCart, dispatch),
  cleanOrder: bindActionCreators(cleanOrder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderPlaced));
