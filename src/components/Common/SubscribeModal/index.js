import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Typography } from '@material-ui/core';
import Preloader from '../Preloader';
import ErrorBoundary from '../../../containers/ErrorBoundary';

import checkedColored from '../../../assets/img/checked-colored.svg';

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
  contentWrapperStripe: {
    padding: '50px 100px',
    textAlign: 'center'
  },
  title: {
    fontSize: '32px',
    fontWeight: '900'
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

function SubscribeModal(props) {
  const classes = useStyles();
  const {
    loading,
    addEmpathizeSubscription,
    resetEmpathizeSubscription,
    isRegistration
  } = props;

  try {
    const createStripe = () => {
      if (isRegistration) {
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
      } else {
        resetEmpathizeSubscription();
      }
    };

    return (
      <Dialog
        classes={{ paper: classes.paper }}
        className={classes.modalWrapper}
        open
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
              {isRegistration ? 'Let’s Jump In' : 'Subscribe'}
            </Button>
            <Typography className={classes.smallText}>
              Cancel anytime in Settings. By continuing, you agree to our{' '}
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
        )}
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

SubscribeModal.propTypes = {
  loading: PropTypes.bool,
  addEmpathizeSubscription: PropTypes.func,
  resetEmpathizeSubscription: PropTypes.func,
  isRegistration: PropTypes.bool
};

SubscribeModal.defaultProps = {
  loading: undefined,
  addEmpathizeSubscription: undefined,
  resetEmpathizeSubscription: undefined,
  isRegistration: undefined
};

export default SubscribeModal;
