import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import history from '../../history';
import ErrorBoundary from '../../containers/ErrorBoundary';
import SigninForm from './SigninForm';
import Code2FAModal from '../../components/Common/Code2FAModal';

import {
  REGISTRATION_ERROR,
  SEND_2FA_REQUEST,
  SHOW_2FA,
  SIGNIN_REQUEST
} from '../../redux/actions/actionTypes';

const useStyles = makeStyles(theme => ({
  h1: {
    fontSize: '36px',
    fontWeight: '900',
    textAlign: 'center',
    marginTop: '47px'
  },
  subtitle: {
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  form: {
    maxWidth: '400px',
    margin: '40px auto 80px auto'
  }
}));

function Signin(props) {
  const {
    fetchSignin,
    loading,
    send2FACode,
    is2FA,
    hide2FA,
    registrationError,
    resetRegistrationError
  } = props;
  const classes = useStyles();
  const [show2FAPreloader, setShow2FAPreloader] = useState(false);
  const [userVals, setUserVals] = useState();
  const [regError, setRegError] = useState();

  const recaptchaRef = useRef();

  useEffect(() => {
    if (is2FA) {
      send2FACode();
    }
  }, [is2FA, send2FACode]);

  useEffect(() => {
    if (registrationError) {
      setRegError(registrationError);
      resetRegistrationError();
    }
  }, [registrationError, setRegError, resetRegistrationError]);

  try {
    const submit = values => {
      const data = { password: values.password };

      if (/@/.test(values.login)) {
        data.email = values.login.toLowerCase();
      } else {
        data.phoneNumber = values.login.replace(/[^+0-9]/g, '');
      }

      if (recaptchaRef && recaptchaRef.current) {
        recaptchaRef.current.execute();
      }

      setUserVals(data);
      fetchSignin(data);
    };

    if (cookie.load('token')) {
      history.push('/snapshot');
    }

    const submit2FACode = values => {
      setShow2FAPreloader(true);
      fetchSignin({ ...userVals, code_2fa: values.code_2fa });
    };

    return (
      <React.Fragment>
        {regError ? (
          <Typography className={classes.h1}>{regError}</Typography>
        ) : (
          <React.Fragment>
            <Typography className={classes.h1}>
              Log Into Your Account
            </Typography>
            <Typography className={classes.subtitle}>
              Not a member yet? <Link to="/registration">Register</Link>
            </Typography>
          </React.Fragment>
        )}
        <div className={classes.form}>
          <SigninForm onSubmit={submit} loading={loading} />
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey="*************"
          />
        </div>
        <Code2FAModal
          is2FACodeVisible={is2FA}
          onSubmit={submit2FACode}
          show2FAPreloader={show2FAPreloader}
          close2FAModal={hide2FA}
          text="Signin"
        />
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Signin.defaultProps = {
  fetchSignin: undefined,
  loading: undefined,
  send2FACode: undefined,
  is2FA: undefined,
  registrationError: undefined,
  resetRegistrationError: undefined
};

Signin.propTypes = {
  fetchSignin: PropTypes.func,
  loading: PropTypes.bool,
  send2FACode: PropTypes.func,
  is2FA: PropTypes.bool,
  registrationError: PropTypes.string,
  resetRegistrationError: PropTypes.func
};

const mapStateToProps = state => ({
  token: state.token,
  loading: state.loading,
  is2FA: state.is2FA,
  registrationError: state.registrationError
});

const actionsStateToProps = {
  fetchSignin: data => ({ type: SIGNIN_REQUEST, data }),
  send2FACode: () => ({ type: SEND_2FA_REQUEST }),
  hide2FA: () => ({ type: SHOW_2FA, payload: false }),
  resetRegistrationError: () => ({ type: REGISTRATION_ERROR, payload: null })
};

export default connect(mapStateToProps, actionsStateToProps)(Signin);
