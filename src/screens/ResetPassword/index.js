import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import history from '../../history';
import ErrorBoundary from '../../containers/ErrorBoundary';
import ResetPasswordForm from './ResetPasswordForm';

import { RESET_PASSWORD_REQUEST } from '../../redux/actions/actionTypes';

const useStyles = makeStyles(theme => ({
  h1: {
    fontSize: '36px',
    fontWeight: '900',
    textAlign: 'center',
    marginTop: '47px'
  },
  subtitle: {
    textAlign: 'center'
  },
  form: {
    textAlign: 'center',
    maxWidth: '400px',
    margin: '40px auto 80px auto'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

function ResetPassword(props) {
  const { loading, resetPassword, isPasswordReset, location } = props;
  const classes = useStyles();

  try {
    const submit = values => {
      if (location && location.search.length > 0) {
        resetPassword({
          password: values.password,
          token: queryString.parse(location.search).token
        });
      }
    };

    if (cookie.load('token')) {
      history.push('/snapshot');
    }

    return (
      <React.Fragment>
        <Typography className={classes.h1}>Reset Password</Typography>

        {!isPasswordReset ? (
          <React.Fragment>
            <Typography className={classes.subtitle}>
              Type your new password here.
            </Typography>
            <div className={classes.form}>
              <ResetPasswordForm onSubmit={submit} loading={loading} />
            </div>
          </React.Fragment>
        ) : (
          <Typography className={classes.subtitle}>
            Your password reset successfully, now you can{' '}
            <Link to="/signin" className={classes.link}>
              Sign in into your account
            </Link>
            .
          </Typography>
        )}
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

ResetPassword.defaultProps = {
  loading: undefined,
  resetPassword: undefined,
  isPasswordReset: undefined,
  location: undefined
};

ResetPassword.propTypes = {
  loading: PropTypes.bool,
  resetPassword: PropTypes.func,
  isPasswordReset: PropTypes.bool,
  location: PropTypes.shape({
    search: PropTypes.string
  })
};

const mapStateToProps = state => ({
  loading: state.loading,
  isPasswordReset: state.isPasswordReset
});

const actionsStateToProps = {
  resetPassword: data => ({ type: RESET_PASSWORD_REQUEST, data })
};

export default withRouter(
  connect(mapStateToProps, actionsStateToProps)(ResetPassword)
);
