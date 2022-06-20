import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '../Icon';
import AccountData from '../AccountData';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { indexRoutes, dashboardRoutes } from '../../../routes';
import useWindowSize from '../../../utils/useWindowSize';

const useStyles = makeStyles(theme => ({
  dashboardWrapper: {
    background: '#fff',
    borderRight: '1px solid #D4DEE8',
    width: '240px',
    minWidth: '240px',
    position: 'relative',
    transition: 'all 0.2s',
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: '72px',
      right: '-300px',
      zIndex: '9001',
      height: 'calc(100% - 70px)',
      overflowY: 'auto',
      border: 'none',
      boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
      transition: 'all 0.3s'
    }
  },
  dashboardInner: {
    width: '240px',
    minWidth: '240px',
    height: 'calc(100vh - 72px)',
    padding: '20px 0',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    transition: 'all 0.3s'
  },
  dashboardWrapperOpened: {
    right: '0'
  },
  shrinkedDashboard: {
    width: '100px',
    minWidth: '100px'
  },
  link: {
    textDecoration: 'none'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 40px',
    margin: '10px 0',
    height: '57px',
    cursor: 'pointer',
    borderRight: '5px solid transparent',
    color: theme.palette.text.secondary,
    transition: 'all 0.2s',
    '& svg': {
      display: 'block',
      width: '100%',
      height: '100%',
      color: theme.palette.text.disabled,
      maxWidth: '25px',
      maxHeight: '24px',
      marginRight: '15px',
      transition: 'all 0.3s'
    },
    '&:hover': {
      color: theme.palette.primary.main,
      '& svg': {
        color: theme.palette.primary.main
      }
    },
    [theme.breakpoints.down('sm')]: {
      borderRight: 'none',
      borderLeft: '5px solid transparent'
    }
  },
  activeMenuItem: {
    background: 'rgba(45,71,254,0.1)',
    borderRight: `5px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '& svg': {
      color: theme.palette.primary.main
    }
  },
  shrinkedMenuItem: {
    padding: '15px 10px',
    '& svg': {
      margin: '0 auto'
    }
  },
  hideOverflow: {
    fontSize: '18px',
    maxWidth: 'calc(100% - 38px)',
    minWidth: 'calc(100% - 38px)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textLign: 'left',
    overflow: 'hidden'
  },
  addAccount: {
    margin: 'auto 0 0 0'
  },
  shrinkBtn: {
    borderRadius: '5px',
    padding: '6px 10px',
    width: '41px',
    height: '41px',
    fontSize: '18px',
    margin: '10px 30px',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    transition: 'all 0.3s',
    '& svg': {
      width: '16px',
      transition: 'all 0.3s'
    },
    '&:hover': {
      background: 'rgba(45,71,254,0.1)'
    }
  },
  shrinkedBtn: {
    padding: '6px 10px',
    margin: '10px 27px',
    '& svg': {
      transform: 'rotate(180deg)'
    }
  }
}));

function Dashboard(props) {
  const {
    pathname,
    isMenuOpen,
    userInfo,
    handleOpenLogout,
    handleOpenAddAccount,
    addWalkthroughItem
  } = props;
  const classes = useStyles();
  const [isBarShrinked, setIsBarShrinked] = useState(
    cookie.load('isMenuShrinked') && cookie.load('isMenuShrinked') === 'true'
  );

  const windowSize = useWindowSize();

  // Walkthrough
  const walkThrough9Ref = useRef(null);
  const walkThrough10Ref = useRef(null);
  const walkThrough11Ref = useRef(null);
  const walkThrough12Ref = useRef(null);
  const walkThrough13Ref = useRef(null);

  useEffect(() => {
    if (
      windowSize.width > 960 &&
      userInfo.registration &&
      userInfo.registration === 'walkthrough'
    ) {
      if (walkThrough9Ref.current) {
        addWalkthroughItem({
          id: 9,
          nodeEl: walkThrough9Ref,
          text: 'You’re here. This is an overview of your finances.',
          scroll: true
        });
      }
      if (walkThrough10Ref.current) {
        addWalkthroughItem({
          id: 10,
          nodeEl: walkThrough10Ref,
          text: 'See all your transactions, sorted by account.'
        });
      }
      if (walkThrough11Ref.current) {
        addWalkthroughItem({
          id: 11,
          nodeEl: walkThrough11Ref,
          text: 'Here you can see which payments to make, and when.'
        });
      }
      if (walkThrough12Ref.current) {
        addWalkthroughItem({
          id: 12,
          nodeEl: walkThrough12Ref,
          text:
            'Figure out when you’ll get out of debt, and how much interest you’ll end up paying.'
        });
      }
      if (walkThrough13Ref.current) {
        addWalkthroughItem({
          id: 13,
          nodeEl: walkThrough13Ref,
          text:
            'See what you’re subscribed to, and click 1 button to start a cancellation process.'
        });
      }
    }
  });

  try {
    const shrinkBar = () => {
      setIsBarShrinked(!isBarShrinked);
      cookie.save('isMenuShrinked', !isBarShrinked);
    };

    const menu = windowSize.width > 600 ? indexRoutes : dashboardRoutes;

    return (
      <div
        className={`${classes.dashboardWrapper} ${
          isMenuOpen && windowSize.width < 960
            ? classes.dashboardWrapperOpened
            : ''
        } ${
          isBarShrinked && windowSize.width > 960
            ? classes.shrinkedDashboard
            : ''
        }`}
      >
        <div
          className={`${classes.dashboardInner} ${
            isBarShrinked && windowSize.width > 960
              ? classes.shrinkedDashboard
              : ''
          }`}
        >
          {windowSize.width < 600 && userInfo && (
            <AccountData userInfo={userInfo} />
          )}

          {menu.map(item => {
            let menuItemRef;
            if (item.title === 'Snapshot') {
              menuItemRef = walkThrough9Ref;
            } else if (item.title === 'Transactions') {
              menuItemRef = walkThrough10Ref;
            } else if (item.title === 'Payments') {
              menuItemRef = walkThrough11Ref;
            } else if (item.title === 'Make a Plan') {
              menuItemRef = walkThrough12Ref;
            } else if (item.title === 'Subscription') {
              menuItemRef = walkThrough13Ref;
            }

            return (
              <Link
                to={item.path}
                key={item.title}
                className={classes.link}
                ref={menuItemRef}
              >
                <div
                  className={`${classes.menuItem} ${
                    pathname === item.path &&
                    (!userInfo.registration ||
                      userInfo.registration === null ||
                      userInfo.registration === 'done')
                      ? classes.activeMenuItem
                      : ''
                  } ${
                    isBarShrinked && windowSize.width > 960
                      ? classes.shrinkedMenuItem
                      : ''
                  }`}
                >
                  <Icon icon={item.icon} />{' '}
                  {isBarShrinked && windowSize.width > 960 ? (
                    ''
                  ) : (
                    <Typography className={classes.hideOverflow}>
                      {item.title}
                    </Typography>
                  )}
                </div>
              </Link>
            );
          })}

          {windowSize.width < 600 && (
            <div
              className={classes.menuItem}
              role="presentation"
              onClick={handleOpenLogout}
            >
              <Icon icon="logout" />{' '}
              <Typography className={classes.hideOverflow}>Log out</Typography>
            </div>
          )}

          <div
            className={`${classes.menuItem} ${classes.addAccount} ${
              isBarShrinked && windowSize.width > 960
                ? classes.shrinkedMenuItem
                : ''
            }`}
            role="presentation"
            onClick={handleOpenAddAccount}
          >
            <Icon icon="plus" />{' '}
            {isBarShrinked && windowSize.width > 960 ? (
              ''
            ) : (
              <Typography className={classes.hideOverflow}>
                Add account
              </Typography>
            )}
          </div>
          {windowSize.width > 960 ? (
            <div
              className={`${classes.shrinkBtn} ${
                isBarShrinked && windowSize.width > 960
                  ? classes.shrinkedBtn
                  : ''
              }`}
              role="presentation"
              onClick={shrinkBar}
            >
              <Icon icon="back" />
            </div>
          ) : null}
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Dashboard.propTypes = {
  pathname: PropTypes.string,
  isMenuOpen: PropTypes.bool,
  userInfo: PropTypes.shape({}),
  handleOpenLogout: PropTypes.func,
  handleOpenAddAccount: PropTypes.func,
  addWalkthroughItem: PropTypes.func
};

Dashboard.defaultProps = {
  pathname: undefined,
  isMenuOpen: undefined,
  userInfo: undefined,
  handleOpenLogout: undefined,
  handleOpenAddAccount: undefined,
  addWalkthroughItem: undefined
};

export default Dashboard;
