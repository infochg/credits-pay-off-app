import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '10px 0'
  },
  input: {
    padding: '16px 16px'
  },
  label: {
    fontSize: '16px',
    color: theme.palette.text.primary,
    padding: '0 10px 10px 10px'
  }
}));

function RenderTextField({
  label,
  placeholder,
  input,
  meta: { touched, invalid, error },
  ...custom
}) {
  const classes = useStyles();

  try {
    return (
      <div className={classes.wrapper}>
        <InputLabel className={classes.label}>{label}</InputLabel>
        <TextField
          className={classes.textfield}
          placeholder={placeholder}
          error={touched && invalid}
          helperText={touched && error}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...input}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...custom}
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

RenderTextField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.string
  })
};

RenderTextField.defaultProps = {
  placeholder: undefined,
  label: undefined,
  input: undefined,
  meta: undefined
};

export default RenderTextField;
