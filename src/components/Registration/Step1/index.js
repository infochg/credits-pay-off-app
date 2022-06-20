import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../../Common/TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(() => ({
  submitBtn: {
    marginTop: '40px',
    paddingTop: '6px',
    paddingBottom: '6px',
    minWidth: '187px'
  },
  label: {
    textAlign: 'left'
  }
}));

const validate = values => {
  const errors = {};
  if (!values.phoneNumber || values.phoneNumber === '') {
    errors.phoneNumber = 'Field is required.';
  }

  if (values.phoneNumber && !/^[+)(\- 0-9\b]+$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'The phone number must consist of digits.';
  }

  if (!values.password || values.password === '') {
    errors.password = 'Field is required.';
  }

  if (values.password && !/^(?=.*\d)(?=.*[\W]).{8,20}$/.test(values.password)) {
    errors.password =
      'You must have at least 8 characters, special character and number';
  }
  return errors;
};

function Step1(props) {
  const classes = useStyles();
  const { handleSubmit, pristine, submitting, loading } = props;

  try {
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={5}>
            <Typography className={classes.label}>Mobile Number:</Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Field
              name="phoneNumber"
              component={TextField}
              variant="outlined"
              type="tel"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.label}>Password:</Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Field
              name="password"
              component={TextField}
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        {!loading ? (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            disabled={pristine || submitting}
            className={classes.submitBtn}
          >
            Sign Up
          </Button>
        ) : (
          <div className={classes.submitBtn}>
            <CircularProgress />
          </div>
        )}
      </Form>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Step1.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.shape({}),
  loading: PropTypes.bool
};

Step1.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  classes: undefined,
  loading: undefined
};

export default reduxForm({
  form: 'Step1',
  validate
})(Step1);
