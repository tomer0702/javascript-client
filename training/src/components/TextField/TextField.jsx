import React from 'react';

import PropTypes from 'prop-types';

import { Error, Input } from './style';

const TextField = (props) => {
  const { value, disabled, error } = props;
  if (error) {
    return (
      <>
        <h6 hidden> learn react </h6>
        <Input type="text" defaultValue={value} error />
        <Error>{error}</Error>
      </>
    );
  }
  return (
    <Input type="text" defaultValue={value} disabled={disabled} />
  );
};
export default TextField;
TextField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};
TextField.defaultProps = {
  value: '',
  disabled: '',
  error: '',
};
