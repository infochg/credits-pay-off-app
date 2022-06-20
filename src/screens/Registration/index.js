import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReCAPTCHA from 'react-google-recaptcha';
import cookie from 'react-cookies';
import history from '../../history';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Step1 from '../../components/Registration/Step1';
import Step2 from '../../components/Registration/Step2';

import {
  REGISTRATION_REQUEST,
  TOGGLE_ADD_ACCOUNT,
  VERIFY_PHONE_REQUEST
} from '../../redux/actions/actionTypes';

import connectBank from '../../assets/img/connect-bank.svg';

const useStyles = makeStyles(theme => ({
  h1: {
    fontSize: '36px',
    fontWeight: '900',
    textAlign: 'center'
  },
  h2: {
    fontSize: '22px',
    fontWeight: '900'
  },
  h3: {
    fontSize: '20px',
    fontWeight: '900'
  },
  subtext: {
    fontSize: '22px',
    color: theme.palette.text.secondary,
    margin: '10px auto 40px auto',
    textAlign: 'center',
    maxWidth: '530px',
    '& span': {
      whiteSpace: 'nowrap'
    }
  },
  form: {
    textAlign: 'center',
    maxWidth: '500px',
    margin: '0 auto 80px auto'
  },
  center: {
    textAlign: 'center'
  },
  connectBank: {
    maxWidth: '80%',
    margin: '0 auto 10px auto'
  },
  submitBtn: {
    margin: '10px auto',
    paddingTop: '6px',
    paddingBottom: '6px',
    minWidth: '187px'
  }
}));

function Registration(props) {
  const {
    fetchRegistration,
    verifyPhone,
    toggleAddAccountModal,
    loading,
    registrationError
  } = props;
  const [step, setStep] = useState(1);
  const [phoneNum, setPhoneNum] = useState('+1 000-000-0000');
  const [isProceedOpen, setIsProceedOpen] = useState(false);

  const classes = useStyles();

  const recaptchaRef = useRef();

  try {
    if (registrationError) {
      history.push('/signin');
    }

    if (cookie.load('token') && step !== 3) {
      setStep(3);
    }

    const nextStep = () => {
      if (step === 3) {
        toggleAddAccountModal({
          isOpen: true,
          isRegistration: true,
          onSuccess: () => {
            if (cookie.load('token')) {
              history.push('/snapshot');
            }
          },
          onExit: () => {
            setIsProceedOpen(true);
          }
        });
      } else {
        setStep(step + 1);
      }
    };

    const step1Submit = values => {
      fetchRegistration({
        ...values,
        phoneNumber: values.phoneNumber.replace(/[^+0-9]/g, '')
      });

      if (window.ga) {
        window.ga('gtm2.send', {
          hitType: 'event',
          eventCategory: 'Created a new account',
          eventAction: 'Submit',
          eventLabel: 'web',
          eventValue: 0
        });
      }

      if (recaptchaRef && recaptchaRef.current) {
        recaptchaRef.current.execute();
      }

      if (values.phoneNumber) {
        setPhoneNum(values.phoneNumber.replace(/[^+0-9]/g, ''));
        nextStep();
      }
    };

    const step2Submit = values => {
      verifyPhone({ ...values, phoneNumber: phoneNum });
    };

    const steps = {
      1: (
        <React.Fragment>
          <Typography className={classes.h1}>Create Account</Typography>
          <Typography className={classes.subtext}>
            Let’s create your personalized Empathize experience
          </Typography>
          <div className={classes.form}>
            <Step1 onSubmit={step1Submit} loading={loading} />
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey="*****************"
            />
          </div>
        </React.Fragment>
      ),
      2: (
        <React.Fragment>
          <Typography className={classes.h1}>Confirm your number</Typography>
          <Typography className={classes.subtext}>
            Please, submit the 6-digit confirmation code sent to{' '}
            <span>{phoneNum}</span>
          </Typography>
          <div className={classes.form}>
            <Step2 onSubmit={step2Submit} loading={loading} />
          </div>
        </React.Fragment>
      ),
      3: (
        <div className={classes.center}>
          <img src={connectBank} alt="" className={classes.connectBank} />
          {!isProceedOpen ? (
            <React.Fragment>
              <Typography className={classes.h1}>
                Connect Your Checking Account
              </Typography>
              <Typography className={classes.subtext}>
                This is the main account you use to pay bills & deposit
                paychecks
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="button"
                className={classes.submitBtn}
                onClick={nextStep}
              >
                Continue
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography className={classes.h1}>
                Let&lsquo;s Setup Your Account.
              </Typography>
              <Typography className={classes.subtext}>
                Connect your checking account to get started.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="button"
                className={classes.submitBtn}
                onClick={nextStep}
              >
                Connect Account
              </Button>
            </React.Fragment>
          )}
        </div>
      )
    };

    return steps[step];
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Registration.defaultProps = {
  fetchRegistration: undefined,
  toggleAddAccountModal: undefined,
  verifyPhone: undefined,
  loading: undefined,
  isPhoneVerified: undefined,
  registrationError: undefined
};

Registration.propTypes = {
  fetchRegistration: PropTypes.func,
  toggleAddAccountModal: PropTypes.func,
  verifyPhone: PropTypes.func,
  loading: PropTypes.bool,
  isPhoneVerified: PropTypes.shape({}),
  registrationError: PropTypes.string
};

const mapStateToProps = state => ({
  token: state.token,
  loading: state.loading,
  isPhoneVerified: state.isPhoneVerified,
  registrationError: state.registrationError
});

const actionsStateToProps = {
  fetchRegistration: data => ({ type: REGISTRATION_REQUEST, data }),
  verifyPhone: data => ({ type: VERIFY_PHONE_REQUEST, data }),
  toggleAddAccountModal: payload => ({ type: TOGGLE_ADD_ACCOUNT, payload })
};

export default connect(mapStateToProps, actionsStateToProps)(Registration);
