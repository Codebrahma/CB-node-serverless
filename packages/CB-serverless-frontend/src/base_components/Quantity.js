import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pink600 } from 'material-ui/styles/colors';

const CountSpan = styled.button`
  text-align: center;
  font-weight: bold;
  font-size: ${props => Math.max(props.size / 2, 15)}px;
  border-radius: ${props => (props.right ? '0px 4px 4px 0px' : '4px 0 0 4px')};
  color: #f5f5f5;
  background: ${pink600}
  
  border-style: solid;
  border-color: #ddd;
  border-width: ${props => (props.right ? '1px 1px 1px 0px' : '1px 0 1px 1px')};
  
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const CountInput = styled.input`
  color: ${pink600}
  height: ${props => props.size}px;
  width: ${props => props.size + 10}px;
  border-color: #ddd;
  border-width: 1px 0 1px;
  border-style: solid;
  padding-left: ${props => ((props.size + 10) / 2) - 4}px;
`;

const RowFlex = styled.div`
  display: flex;
  margin-right: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

class Quantity extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.initialQuantity,
    };
  }

  dec = () => {
    const { disabled } = this.props;

    const { count: currentCount } = this.state;
    if (!disabled && currentCount >= 2) { // minimum quantity to be one
      this.setState((s, p) => ({
        count: s.count - 1,
      }), () => this.props.onChange(this.state.count));
    }
  };

  inc = () => {
    const { disabled } = this.props;

    const { count: currentCount } = this.state;
    if (!disabled && currentCount < 10) { // minimum quantity to be one
      this.setState((s, p) => ({
        count: s.count + 1,
      }), () => this.props.onChange(this.state.count));
    }
  };

  render() {
    const { size, disabled } = this.props;
    return (
      <RowFlex>
        <CountSpan
          onClick={this.dec}
          size={size}
        >-
        </CountSpan>
        <CountInput
          disabled={disabled}
          type="text"
          min="1"
          max="10"
          step="1"
          value={this.state.count}
          readOnly
          size={size}
        />
        <CountSpan
          size={size}
          right
          onClick={this.inc}
        >+
        </CountSpan>
      </RowFlex>
    );
  }
}

Quantity.defaultProps = {
  initialQuantity: 1,
  disabled: false,
  size: 25,
};

Quantity.propTypes = {
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number,
  initialQuantity: PropTypes.number,
  disabled: PropTypes.bool,
};


export default Quantity;
