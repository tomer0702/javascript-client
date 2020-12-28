import React from 'react';
import PropTypes from 'prop-types';

const getResult = (first, second, operator) => {
  let result;
  if (!(operator === '+' || operator === '-' || operator === '*' || operator === '/')) {
    result = 'invalid operator';
  } else {
    switch (operator) {
    case '+': result = first + second;
      break;
    case '-': result = first - second;
      break;
    case '*': result = first * second;
      break;
    case '/': result = first / second;
      break;
    default: return ('invalid operator');
    }
  }
  return result;
};

const Calculation = (props) => {
  const {
    first, second, operator, children,
  } = props;
  if (children) {
    return children(first, second, getResult(first, second, operator), operator);
  }
  return (
    <p>
      {`Result of ${first} ${operator} ${second} = `}
      {
        getResult(first, second, operator)
      }
    </p>
  );
};

Calculation.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

Calculation.defaultProps = {
  children: null,
};
export default Calculation;
