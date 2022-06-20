import React from 'react';
import { Select, FormControl } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: '10px 0'
  },
  select: {
    width: '300px',
    border: '1px solid #D4DEE8',
    height: '60px',
    padding: '0 30px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    fontSize: '16px',
    textAlign: 'left',
    fontWeight: '900',
    '&:focus': {
      background: 'transparent'
    }
  }
}));

function RenderTextField({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) {
  const classes = useStyles();

  try {
    return (
      <div className={classes.wrapper}>
        <FormControl variant="outlined" error={touched && error}>
          <Select
            native
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...input}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...custom}
            classes={{ select: classes.select }}
          >
            {children}
          </Select>
          {/* renderFromHelper({ touched, error })} */}
        </FormControl>
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
