import React from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../../components/Common/TextField';
import ErrorBoundary from '../../containers/ErrorBoundary';

const required = value => (value && value !== '' ? undefined : 'Required');

const useStyles = makeStyles(theme => ({
  submitBtn: {
    margin: '40px auto 0 auto'
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
  },
  codeText: {
    textAlign: 'left'
  },
  center: {
    textAlign: 'center'
  }
}));

function SigninForm(props) {
  const classes = useStyles();
  const { handleSubmit, pristine, submitting, loading } = props;

  try {
    return (
      <Form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Field
              name="login"
              placeholder="Mobile Number or Email"
              component={TextField}
              validate={required}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="password"
              component={TextField}
              placeholder="Password"
              type="password"
              validate={required}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Typography className={classes.forgotText}>
          <Link to="/forgotpassword">Forgot password?</Link>
        </Typography>
        <div className={classes.center}>
          {!loading ? (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
              disabled={pristine || submitting}
              className={classes.submitBtn}
            >
              Log In
            </Button>
          ) : (
            <div className={classes.submitBtn}>
              <CircularProgress />
            </div>
          )}
        </div>
      </Form>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

SigninForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.shape({}),
  loading: PropTypes.bool
};

SigninForm.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  classes: undefined,
  loading: undefined
};

export default reduxForm({
  form: 'SigninForm'
})(SigninForm);
