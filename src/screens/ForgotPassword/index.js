import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import history from '../../history';
import ErrorBoundary from '../../containers/ErrorBoundary';
import ForgotPasswordForm from './ForgotPasswordForm';
import VerifyResetCodeModal from '../../components/ForgotPassword/VerifyResetCodeModal';

import {
  FORGOT_PASSWORD_REQUEST,
  VERIFY_RESET_CODE_REQUEST
} from '../../redux/actions/actionTypes';

const useStyles = makeStyles(() => ({
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
  }
}));

function ForgotPassword(props) {
  const classes = useStyles();
  const {
    loading,
    sendContact,
    verifyResetCode,
    isContactSent,
    isResetCodeVerified
  } = props;
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    if (isResetCodeVerified) {
      history.push(`/reset?token=${isResetCodeVerified}`);
    }
  }, [isResetCodeVerified]);

  try {
    const submit = values => {
      if (!/@/.test(values.contact)) {
        setPhoneNumber(values.contact);
      }
      sendContact(values);
    };

    const submitPhoneCode = values => {
      verifyResetCode({ ...values, phoneNumber });
    };

    if (cookie.load('token')) {
      history.push('/snapshot');
    }

    const contactSent = phoneNumber ? (
      <VerifyResetCodeModal onSubmit={submitPhoneCode} loading={loading} />
    ) : (
      <Typography className={classes.subtitle}>
        We have sent link to your mail, please, check it.
      </Typography>
    );

    return (
      <React.Fragment>
        <Typography className={classes.h1}>Forgot password</Typography>
        {!isContactSent ? (
          <React.Fragment>
            <Typography className={classes.subtitle}>
              We will send link to reset your password to your contact.
            </Typography>
            <div className={classes.form}>
              <ForgotPasswordForm onSubmit={submit} loading={loading} />
            </div>
          </React.Fragment>
        ) : (
          contactSent
        )}
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

ForgotPassword.defaultProps = {
  loading: undefined,
  sendContact: undefined,
  verifyResetCode: undefined,
  isContactSent: undefined,
  isResetCodeVerified: undefined
};

ForgotPassword.propTypes = {
  loading: PropTypes.bool,
  sendContact: PropTypes.func,
  verifyResetCode: PropTypes.func,
  isContactSent: PropTypes.bool,
  isResetCodeVerified: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.loading,
  isContactSent: state.isContactSent,
  isResetCodeVerified: state.isResetCodeVerified
});

const actionsStateToProps = {
  sendContact: data => ({ type: FORGOT_PASSWORD_REQUEST, data }),
  verifyResetCode: data => ({ type: VERIFY_RESET_CODE_REQUEST, data })
};

export default connect(mapStateToProps, actionsStateToProps)(ForgotPassword);
