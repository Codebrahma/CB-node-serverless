import styled from 'styled-components';
import { Wrapper } from '../../../base_components/index';

/** ***************************************
 *      CART HOME Styled Components
 * ****************************************
 */
export const CartWrapper = Wrapper.extend`
  color: #222;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

export const CartMain = styled.div`
  flex: 7;
  padding: 3em 2em;
  background: #fff;
  box-shadow: 0 0 10px 1px #eee;  
`;


export const EmptyCart = styled.div`
  padding: 2em;
  font-size: 20px;
  text-align: center;
  color: #888;
  background: #eee;
  margin: 4em auto 1em;
`;


export const CartHead = styled.h1`
  border-bottom: 1px solid #eee;
  padding-bottom: 1em;
`;


export const RightSideContent = styled.div`
  margin: 0 1em;
  flex: 2.5;
  color: #333;
`;


export const OrderPending = styled.section`
  background: #fff;
  padding: 1em 2em;
  
  > h3 {
    margin: 1em 0 2em;
  }
  
  > p {
    margin: 1em 0 3em;
    font-weight: bold;
    color: #888;
    letter-spacing: 0.5px;
  }
`;

export const TotalSection = styled.div`
  margin: 2em auto;
  font-size: 1.5em;
  padding: 0 3em;
  text-align: right;
  > span:first-child{
    margin: 0 2em;
  }
`;
/**
 * Cart Item styled components
 */


export const CartItemWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 2em;
  margin-bottom: 1em;
  border-bottom: 1px solid #eee;
`;


export const ItemImage = styled.img`
    flex: 0 0 80px;
    width: 80px;
    height: 80px;
    margin: 0 2em;
`;


export const ItemTitle = styled.div`
  flex: 1 1 60%;
  text-align: left;
  font-size: 1.1em;
  margin: 0 1em;
`;


export const DeleteIconWrap = styled.div`
  flex: 0 0 180px;
  text-align: left;
  font-size: 20px;
  margin: 0 1em;
`;


export const SoldOutError = styled.p`
  color: red;
  font-size: 14px;
  margin: 1em auto;
`;

