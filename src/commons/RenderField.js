/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function RenderField({
  input, label, meta: { touched, error },
}) {
  const isError = touched && error ? 'error' : null;
  return (
    <div>
      <TextField
        fullWidth
        type="text"
        label={label}
        {...input}
      />
      { isError && <p>{ error}</p>}
    </div>
  );
}

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

RenderField.defaultProps = {
  label: '',
  type: 'text',
};

export default RenderField;
