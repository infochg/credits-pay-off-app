import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import Icon from '../../components/Common/Icon';
import Preloader from '../../components/Common/Preloader';
import GeneralInformation from '../../components/Settings/GeneralInformation';
import Accounts from '../../components/Settings/Accounts';
import Security from '../../components/Settings/Security';
import ErrorBoundary from '../../containers/ErrorBoundary';
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  TOGGLE_ADD_ACCOUNT,
  UPDATE_USER_INFO_REQUEST,
  SEND_2FA_REQUEST,
  TOGGLE_2FA_REQUEST,
  SHOW_2FA,
  CANCEL_EMPATHIZE_SUBSCRIPTION_REQUEST,
  RESET,
  BILLING_DATE_REQUEST,
  ACCOUNTS_DATA_REQUEST
} from '../../redux/actions/actionTypes';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    margin: '20px',
    minHeight: '100%',
    width: '100%',
    display: 'flex'
  },
  leftMenu: {
    minWidth: '290px',
    maxWidth: '290px',
    borderRight: '1px solid #F2F4F6'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    height: '70px',
    borderBottom: '1px solid #F2F4F6',
    borderRight: '3px solid transparent',
    transition: 'all 0.3s',
    cursor: 'pointer',
    '& svg': {
      color: theme.palette.text.disabled,
      width: '100%',
      height: '100%',
      maxWidth: '20px',
      maxHeight: '20px',
      margin: '0 18px',
      transition: 'all 0.3s'
    },
    '&:hover': {
      color: theme.palette.primary.main,
      '& svg': {
        color: theme.palette.primary.main
      }
    }
  },
  activeMenuItem: {
    background: 'rgba(0,106,216,0.1)',
    borderRight: `3px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '& svg': {
      color: theme.palette.primary.main
    }
  },
  name: {
    fontSize: '16px'
  },
  desc: {
    fontSize: '16px',
    color: theme.palette.text.secondary
  },
  content: {
    width: '100%',
    padding: '30px'
  },
  [theme.breakpoints.down('xs')]: {
    leftMenu: {
      display: 'none'
    },
    leftMenuActive: {
      display: 'block',
      minWidth: '100%',
      maxWidth: '100%'
    },
    contentInactive: {
      display: 'none'
    }
  }
}));

function Settings(props) {
  const {
    userInfo,
    updateUserInfo,
    accountsData,
    fetchAccountsData,
    changePassword,
    isPasswordChanged,
    resetChangePassword,
    loading,
    toggleAddAccountModal,
    send2FACode,
    toggle2FA,
    is2FA,
    hide2FA,
    cancelEmpathizeSubscription,
    isUserUnsubscribed,
    resetData,
    requestBillingDate,
    billingDate
  } = props;
  const classes = useStyles();
  const [activeMenu, setActiveMenu] = useState('General information');
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(true);

  useEffect(() => {
    if (!accountsData && activeMenu === 'Accounts') {
      fetchAccountsData();
    }
  }, [accountsData, fetchAccountsData, activeMenu]);

  // Unsubscribing
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isUserUnsubscribed) {
      resetData();
    }
  }, [isUserUnsubscribed, resetData]);

  const unsubscribe = values => {
    setShowLoader(true);
    cancelEmpathizeSubscription(values);
    if (window.ga) {
      window.ga('gtm2.send', {
        hitType: 'event',
        eventCategory: 'Cancelled subscription',
        eventAction: 'Unsubscribed',
        eventLabel: 'web',
        eventValue: 0
      });
    }
  };

  try {
    const goBack = () => {
      setIsMobileMenuActive(true);
    };

    const changeActiveMenuItem = name => {
      setActiveMenu(name);
      setIsMobileMenuActive(false);
    };

    const menu = [
      {
        name: 'General information',
        desc: 'Name, phone number',
        icon: 'user',
        component: (
          <GeneralInformation
            data={userInfo}
            updateUserInfo={updateUserInfo}
            loading={loading}
            goBack={goBack}
          />
        )
      },
      {
        name: 'Accounts',
        desc: 'Connected accounts',
        icon: 'credit-cards',
        component: (
          <Accounts
            data={accountsData}
            toggleAddAccountModal={toggleAddAccountModal}
            goBack={goBack}
          />
        )
      },
      {
        name: 'Security',
        desc: 'Password & security questions',
        icon: 'lock',
        component: (
          <Security
            changePassword={changePassword}
            isPasswordChanged={isPasswordChanged}
            resetChangePassword={resetChangePassword}
            userInfo={userInfo}
            send2FACode={send2FACode}
            toggle2FA={toggle2FA}
            is2FA={is2FA}
            hide2FA={hide2FA}
            loading={loading}
            goBack={goBack}
            showLoader={showLoader}
            unsubscribe={unsubscribe}
            requestBillingDate={requestBillingDate}
            billingDate={billingDate}
          />
        )
      }
    ];

    if (Object.keys(userInfo).length > 0) {
      return (
        <Card className={classes.card}>
          <div
            className={`${classes.leftMenu} ${
              isMobileMenuActive ? classes.leftMenuActive : ''
            }`}
          >
            {menu.map(item => {
              return (
                <div
                  key={item.name}
                  className={`${classes.menuItem} ${
                    activeMenu === item.name ? classes.activeMenuItem : ''
                  }`}
                  role="presentation"
                  onClick={() => changeActiveMenuItem(item.name)}
                >
                  <Icon icon={item.icon} />
                  <div className={classes.nameWrapper}>
                    <Typography className={classes.name}>
                      {item.name}
                    </Typography>
                    <Typography className={classes.desc}>
                      {item.desc}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`${classes.content} ${
              isMobileMenuActive ? classes.contentInactive : ''
            }`}
          >
            {menu.find(item => item.name === activeMenu).component}
          </div>
        </Card>
      );
    }

    return <Preloader isCards />;
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Settings.defaultProps = {
  userInfo: undefined,
  accountsData: undefined,
  fetchAccountsData: undefined,
  updateUserInfo: undefined,
  changePassword: undefined,
  isPasswordChanged: undefined,
  resetChangePassword: undefined,
  loading: undefined,
  toggleAddAccountModal: undefined,
  send2FACode: undefined,
  toggle2FA: undefined,
  is2FA: undefined,
  hide2FA: undefined,
  cancelEmpathizeSubscription: undefined,
  isUserUnsubscribed: undefined,
  resetData: undefined,
  requestBillingDate: undefined,
  billingDate: undefined
};

Settings.propTypes = {
  userInfo: PropTypes.shape({
    is_paying: PropTypes.bool
  }),
  accountsData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]),
  fetchAccountsData: PropTypes.func,
  updateUserInfo: PropTypes.func,
  changePassword: PropTypes.func,
  isPasswordChanged: PropTypes.bool,
  resetChangePassword: PropTypes.func,
  loading: PropTypes.bool,
  toggleAddAccountModal: PropTypes.func,
  send2FACode: PropTypes.func,
  toggle2FA: PropTypes.func,
  is2FA: PropTypes.bool,
  hide2FA: PropTypes.func,
  cancelEmpathizeSubscription: PropTypes.func,
  isUserUnsubscribed: PropTypes.bool,
  resetData: PropTypes.func,
  requestBillingDate: PropTypes.func,
  billingDate: PropTypes.string
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  accountsData: state.accountsData,
  loading: state.loading,
  isPasswordChanged: state.isPasswordChanged,
  toggleAddAccountModal: state.toggleAddAccountModal,
  is2FA: state.is2FA,
  isUserUnsubscribed: state.isUserUnsubscribed,
  billingDate: state.billingDate
});

const actionsStateToProps = {
  updateUserInfo: data => ({ type: UPDATE_USER_INFO_REQUEST, data }),
  fetchAccountsData: () => ({ type: ACCOUNTS_DATA_REQUEST }),
  changePassword: data => ({ type: CHANGE_PASSWORD_REQUEST, data }),
  resetChangePassword: () => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: { status: false }
  }),
  toggleAddAccountModal: payload => ({ type: TOGGLE_ADD_ACCOUNT, payload }),
  send2FACode: () => ({ type: SEND_2FA_REQUEST }),
  toggle2FA: payload => ({ type: TOGGLE_2FA_REQUEST, payload }),
  hide2FA: () => ({ type: SHOW_2FA, payload: false }),
  cancelEmpathizeSubscription: payload => ({
    type: CANCEL_EMPATHIZE_SUBSCRIPTION_REQUEST,
    payload
  }),
  resetData: () => ({ type: RESET }),
  requestBillingDate: () => ({ type: BILLING_DATE_REQUEST })
};

export default connect(mapStateToProps, actionsStateToProps)(Settings);
