import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Switch, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SecurityForm from './SecurityForm';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Code2FAModal from '../../Common/Code2FAModal';
import UnsubscribeModal from '../../Common/UnsubscribeModal';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingBottom: '100px',
    minHeight: '100%'
  },
  text: {
    fontSize: '18px'
  },
  switchWrapper: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  is2FALabel: {
    display: 'inline-flex',
    fontSize: '16px',
    lineHeight: '22px',
    paddingLeft: '10px'
  },
  btnWrapper: {
    textAlign: 'left',
    marginTop: '20px',
    position: 'absolute',
    bottom: '20px',
    left: '0',
    display: 'flex'
  },
  unsubscrBtn: {
    width: '244px',
    padding: '6px 10px',
    margin: '0 auto'
  },
  billDate: {
    fontSize: '16px',
    lineHeight: '22px',
    paddingLeft: '30px',
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('md')]: {
    wrapper: {
      paddingBottom: '200px'
    },
    btnWrapper: {
      flexDirection: 'column'
    },
    unsubscrBtn: {
      width: '100%',
      maxWidth: '244px'
    },
    billDate: {
      padding: '30px 0 0 0'
    }
  }
}));

const AntSwitch = withStyles(theme => ({
  root: {
    width: 40,
    height: 22,
    padding: 0,
    display: 'inline-flex'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(18px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 18,
    height: 18,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 22 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch);

function Security(props) {
  const {
    changePassword,
    isPasswordChanged,
    resetChangePassword,
    loading,
    goBack,
    send2FACode,
    toggle2FA,
    is2FA,
    hide2FA,
    userInfo,
    showLoader,
    unsubscribe,
    requestBillingDate,
    billingDate
  } = props;
  const classes = useStyles();
  const [showPreloader, setShowPreloader] = useState(false);

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FAPreloader, setShow2FAPreloader] = useState(false);

  useEffect(() => {
    if (isPasswordChanged) {
      setTimeout(resetChangePassword, 3000);
    }
  });

  useEffect(() => {
    if (loading === false) {
      setShowPreloader(false);
      setShow2FAPreloader(false);
    }
  }, [loading]);

  useEffect(() => {
    if (userInfo.otp_enabled !== is2FAEnabled) {
      setIs2FAEnabled(userInfo.otp_enabled);
      setShow2FAPreloader(false);
    }
  }, [userInfo.otp_enabled, is2FAEnabled]);

  // unsubscribe
  const [openUnsubscribe, setOpenUnsubscribe] = useState(false);

  const handleOpenUnsubscribe = () => {
    setOpenUnsubscribe(true);
  };

  const handleCloseUnsubscribe = () => {
    setOpenUnsubscribe(false);
  };

  // Billing date
  useEffect(() => {
    if (!billingDate) {
      requestBillingDate();
    }
  }, [billingDate, requestBillingDate]);

  try {
    const submit = values => {
      const data = {
        old_password: values.oldPassword,
        new_password: values.newPassword
      };
      changePassword(data);
      setShowPreloader(true);
    };

    const handleChange2FA = () => {
      send2FACode();
      setShow2FAPreloader(true);
    };

    const submit2FACode = values => {
      setShow2FAPreloader(true);
      toggle2FA({ enabled_2fa: !is2FAEnabled, ...values });
    };

    return (
      <div className={classes.wrapper}>
        <SecurityForm
          onSubmit={submit}
          showPreloader={showPreloader}
          goBack={goBack}
        />{' '}
        {isPasswordChanged && (
          <Typography className={classes.text}>
            Your password is successfully changed.
          </Typography>
        )}
        <div className={classes.switchWrapper}>
          <AntSwitch
            checked={is2FAEnabled}
            onChange={handleChange2FA}
            name="is2FA"
          />
          <Typography className={classes.is2FALabel}>
            Require email verification when logging in?
          </Typography>
        </div>
        <Code2FAModal
          is2FACodeVisible={is2FA}
          onSubmit={submit2FACode}
          show2FAPreloader={show2FAPreloader}
          close2FAModal={hide2FA}
          text={is2FAEnabled ? 'disable 2FA' : 'enable 2FA'}
        />
        {userInfo.is_paying && (
          <div className={classes.btnWrapper}>
            <div>
              <Button
                variant="contained"
                disableElevation
                className={classes.unsubscrBtn}
                onClick={handleOpenUnsubscribe}
              >
                Unsubscribe
              </Button>
            </div>
            <Typography className={classes.billDate}>
              Empathize.com is free for 30 days, then $5/mo.
              <br />
              Your next billing of $5 will be on {billingDate}.
            </Typography>

            <UnsubscribeModal
              isOpened={openUnsubscribe}
              closeModal={handleCloseUnsubscribe}
              onSubmit={unsubscribe}
              loader={showLoader}
              initialValues={{ cancellationReason: '' }}
            />
          </div>
        )}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Security.defaultProps = {
  changePassword: undefined,
  isPasswordChanged: undefined,
  resetChangePassword: undefined,
  loading: undefined,
  goBack: undefined,
  send2FACode: undefined,
  toggle2FA: undefined,
  is2FA: undefined,
  hide2FA: undefined,
  userInfo: undefined,
  showLoader: undefined,
  unsubscribe: undefined,
  requestBillingDate: undefined,
  billingDate: undefined
};

Security.propTypes = {
  changePassword: PropTypes.func,
  isPasswordChanged: PropTypes.bool,
  resetChangePassword: PropTypes.func,
  loading: PropTypes.bool,
  goBack: PropTypes.func,
  send2FACode: PropTypes.func,
  toggle2FA: PropTypes.func,
  is2FA: PropTypes.bool,
  hide2FA: PropTypes.func,
  userInfo: PropTypes.shape({
    otp_enabled: PropTypes.bool
  }),
  showLoader: PropTypes.bool,
  unsubscribe: PropTypes.func,
  requestBillingDate: PropTypes.func,
  billingDate: PropTypes.string
};

export default Security;
