import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Typography } from '@material-ui/core';
import Preloader from '../Preloader';
import AboutForm from './AboutForm';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../Icon';

import checkedColored from '../../../assets/img/checked-colored.svg';
import loadingIco from '../../../assets/img/loading.svg';

const useStyles = makeStyles(theme => ({
  modalWrapper: {
    zIndex: '9001 !important'
  },
  backDrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  paper: {
    maxWidth: '725px !important'
  },
  formWrapper: {
    maxWidth: '500px',
    margin: '0 auto'
  },
  preloader: {
    padding: '40px'
  },
  contentWrapper: {
    padding: '40px',
    textAlign: 'center'
  },
  contentWrapperStripe: {
    padding: '50px 100px',
    textAlign: 'center'
  },
  title: {
    fontSize: '32px',
    fontWeight: '900'
  },
  grayText: {
    fontSize: '18px',
    color: '#BDBDBD',
    margin: '30px auto 0 auto',
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  smallText: {
    fontSize: '15px',
    color: '#BDBDBD',
    margin: '30px auto 0 auto',
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  close: {
    position: 'absolute',
    right: '15px',
    top: '15px',
    width: '25px',
    color: theme.palette.text.secondary,
    cursor: 'pointer'
  },
  text: {
    color: theme.palette.text.secondary,
    padding: '20px 0',
    maxWidth: '500px',
    margin: '0 auto'
  },
  modalBtns: {
    paddingTop: '20px'
  },
  modalBtn: {
    width: '256px',
    padding: '10px 10px',
    margin: '10px',
    fontSize: '22px'
  },
  bigTitle: {
    fontSize: '39px',
    lineHeight: '46px',
    fontWeight: '900',
    marginBottom: '30px'
  },
  featureLines: {
    maxWidth: '535px',
    margin: '15px auto'
  },
  featureLine: {
    color: '#4F4F4F',
    fontSize: '20px',
    lineHeight: '25px',
    position: 'relative',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    margin: '15px 0',
    '& img': {
      marginRight: '15px'
    }
  },
  closeIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    height: '25px',
    color: theme.palette.text.secondary,
    cursor: 'pointer'
  },
  addBtn: {
    width: '100%',
    maxWidth: '281px',
    padding: '6px 10px',
    margin: '10px'
  },
  [theme.breakpoints.down('sm')]: {
    contentWrapperStripe: {
      padding: '40px'
    }
  },
  [theme.breakpoints.down('xs')]: {
    contentWrapper: {
      padding: '25px'
    },
    contentWrapperStripe: {
      padding: '25px'
    },
    bigTitle: {
      fontSize: '24px',
      lineHeight: '30px'
    },
    modalBtn: {
      maxWidth: '100%',
      fontSize: '18px',
      margin: '10px auto'
    }
  }
}));

function OnboardingModal(props) {
  const classes = useStyles();
  const {
    userInfo,
    updateUserInfo,
    loading,
    addEmpathizeSubscription,
    openAddAccount
  } = props;

  const [curStep, setCurStep] = useState(1);

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      if (userInfo.registration === 'subscribing') {
        setCurStep(2);
      } else if (userInfo.registration === 'addMoreAccounts') {
        setCurStep(3);
      }
    }
  }, [userInfo, setCurStep]);

  try {
    const goToWalkthrough = () => {
      setCurStep(0);
      updateUserInfo({ registration: 'walkthrough' });
    };

    const capitalize = str => {
      if (str) {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
      }
      return null;
    };

    const submit = values => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        registration: 'subscribing'
      };
      updateUserInfo(data);
    };

    const createStripe = () => {
      addEmpathizeSubscription();
      if (window.ga) {
        window.ga('gtm2.send', {
          hitType: 'event',
          eventCategory: 'Started new subscription',
          eventAction: 'Subscribed',
          eventLabel: 'web',
          eventValue: 25
        });
      }
    };

    const openAddAccountModal = () => {
      openAddAccount({
        isOpen: true,
        onSuccess: () => {
          goToWalkthrough();
        },
        onExit: () => {
          goToWalkthrough();
        }
      });
    };

    const steps = {
      1: (
        <div className={classes.contentWrapper}>
          {Object.keys(userInfo).length > 0 ? (
            <Typography className={classes.text}>
              Did we get your name and email right?
              <br />
              Please double check, then click &quot;Confirm&quot;
            </Typography>
          ) : (
            <Typography className={classes.text}>
              Please wait while we connect with your bank,
              <br />
              this takes less than 1 minute ...
            </Typography>
          )}
          <div className={classes.formWrapper}>
            <AboutForm
              onSubmit={submit}
              initialValues={{
                firstName: capitalize(userInfo.firstName),
                lastName: capitalize(userInfo.lastName),
                email: userInfo.email
              }}
              userInfo={userInfo}
            />
          </div>
        </div>
      ),
      2: (
        <div className={classes.contentWrapperStripe}>
          <Typography className={classes.bigTitle}>
            Let’s Crush Your
            <br />
            Debt Once and For All
          </Typography>
          <div className={classes.featureLines}>
            <Typography className={classes.featureLine}>
              <img src={checkedColored} alt="" />
              Pay any credit card or loan in one screen
            </Typography>
            <Typography className={classes.featureLine}>
              <img src={checkedColored} alt="" />
              Get SMS reminders when payments are due
            </Typography>
            <Typography className={classes.featureLine}>
              <img src={checkedColored} alt="" />
              Create an easy to follow plan for getting out of debt
            </Typography>
            <Typography className={classes.featureLine}>
              <img src={checkedColored} alt="" />
              Find and cancel subscriptions you’re not using
            </Typography>
            <Typography className={classes.featureLine}>
              <img src={checkedColored} alt="" />
              See a snapshat of your money across all accounts
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className={classes.modalBtn}
            onClick={createStripe}
          >
            Let’s Jump In
          </Button>
          <Typography className={classes.smallText}>
            Empathize.com is free for 30 days, then $5/mo. Cancel anytime in
            Settings. By continuing, you agree to our{' '}
            <a
              href="https://empathize.com/tos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              billing policies
            </a>
            .
          </Typography>
        </div>
      ),
      3: (
        <div className={classes.contentWrapper}>
          <Icon
            icon="close"
            className={classes.closeIcon}
            role="presentation"
            onClick={goToWalkthrough}
          />
          <img src={loadingIco} alt="" className={classes.img} />
          <Typography className={classes.modalTitle}>
            Add a credit card or loan?
          </Typography>
          <Typography className={classes.modalText}>
            Empathize works best with 3+ accounts connected
          </Typography>
          <div className={classes.modalBtns}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.addBtn}
              onClick={openAddAccountModal}
            >
              + Add Credit Card or Loan
            </Button>
          </div>
        </div>
      )
    };

    return (
      <Dialog
        classes={{ paper: classes.paper }}
        className={classes.modalWrapper}
        open={!!steps[curStep]}
        BackdropProps={{
          classes: {
            root: classes.backDrop
          }
        }}
      >
        {loading ? (
          <div className={classes.preloader}>
            <Preloader />
          </div>
        ) : (
          steps[curStep]
        )}
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

OnboardingModal.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string
  }),
  updateUserInfo: PropTypes.func,
  loading: PropTypes.bool,
  addEmpathizeSubscription: PropTypes.func,
  openAddAccount: PropTypes.func
};

OnboardingModal.defaultProps = {
  userInfo: undefined,
  updateUserInfo: undefined,
  loading: undefined,
  addEmpathizeSubscription: undefined,
  openAddAccount: undefined
};

export default OnboardingModal;
