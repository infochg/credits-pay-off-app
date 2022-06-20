import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '../../components/Common/TextField';
import ErrorBoundary from '../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  submitBtn: {
    marginTop: '40px'
  },
  forgotText: {
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
}));

const validate = values => {
  const errors = {};
  if (!values.password || values.password === '') {
    errors.password = 'Field is required.';
  }

  if (values.password && !/^(?=.*\d)(?=.*[\W]).{8,20}$/.test(values.password)) {
    errors.password =
      'You must have at least 8 characters, special character and number';
  }

  if (!values.passwordAgain || values.passwordAgain === '') {
    errors.passwordAgain = 'Field is required.';
  }

  if (values.passwordAgain !== values.password) {
    errors.passwordAgain = 'Password confirmation is not matching New password';
  }
  return errors;
};

function ResetPasswordForm(props) {
  const classes = useStyles();
  const { handleSubmit, pristine, submitting, loading } = props;

  try {
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Field
              name="password"
              placeholder="New password"
              component={TextField}
              variant="outlined"
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="passwordAgain"
              placeholder="New password again"
              component={TextField}
              variant="outlined"
              type="password"
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
            Send
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

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.shape({}),
  loading: PropTypes.bool
};

ResetPasswordForm.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  classes: undefined,
  loading: undefined
};

export default reduxForm({
  form: 'ResetPasswordForm',
  validate
})(ResetPasswordForm);
