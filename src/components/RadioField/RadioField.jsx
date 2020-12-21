import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from './style';

export default function RadioField(props) {
  const {
    onChange, options,
  } = props;
  return (
    <>
      { options && options.length && options.map(({ value, label }) => (
        <Fragment key={label}>
          <Input type="radio" name="sport" value={value} onChange={onChange} />
          { label }
          <br />
        </Fragment>
      ))}
    </>
  );
}
RadioField.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};
RadioField.defaultProps = {
  options: [],
};
