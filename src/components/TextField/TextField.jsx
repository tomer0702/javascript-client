import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './style';
import { Err } from '../style';

const TextField = (props) => {
  const {
    value, disabled, error, onChange, onBlur,
  } = props;
  if (error) {
    return (
      <>
        <Input type="text" value={value} error onChange={onChange} onBlur={onBlur} />
        <Err>{error}</Err>
      </>
    );
  }
  return (
    <Input type="text" value={value} disabled={disabled} onChange={onChange} onBlur={onBlur} />
  );
};
export default TextField;
TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.string.isRequired,
};
TextField.defaultProps = {
  disabled: false,
  error: '',
  onChange: '',
};
