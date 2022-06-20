import React, { useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Hamburger from 'hamburger-react';
import { Badge } from '@material-ui/core';
import Icon from '../Icon';
import AccountData from '../AccountData';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import useWindowSize from '../../../utils/useWindowSize';

import logo from '../../../assets/img/logo.svg';

const useStyles = makeStyles(theme => ({
  navbarWrapper: {
    background: '#fff',
    borderBottom: '1px solid #CCE1F7',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '9001'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '71px'
  },
  topRight: {
    margin: '0 30px 0 auto',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      zIndex: '9000',
      top: '71px',
      right: '0',
      padding: '0',
      background: '#fff',
      width: '230px',
      boxShadow: '0px 4px 8px rgba(119, 140, 162, 0.4)',
      textAlign: 'center',
      maxHeight: '0',
      overflowY: 'hidden',
      opacity: '0',
      transition: 'all 0.3s'
    }
  },
  openedMenu: {
    padding: '40px',
    maxHeight: '3000px',
    overflowY: 'visible',
    opacity: '1'
  },
  logo: {
    width: '148px',
    lineHeight: '0',
    margin: '15px 10px 15px 30px',
    '& img': {
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      margin: '15px 10px 15px 15px'
    }
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: '18px',
    textDecoration: 'none',
    marginRight: '50px',
    transition: 'all 0.2s',
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.primary.main,
      textAlign: 'center',
      display: 'block',
      margin: '0 auto 30px auto',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  btn: {
    padding: '10px 20px',
    color: '#212533',
    textDecoration: 'none',
    borderRadius: '30px',
    border: `2px solid ${theme.palette.primary.main}`,
    background: 'transparent',
    transition: 'all 0.2s',
    '&:hover': {
      color: '#fff',
      background: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`
    },
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.primary.main,
      display: 'block',
      border: `2px solid ${theme.palette.primary.main}`
    }
  },
  hamb: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      padding: '0 30px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 20px'
    }
  },
  rightSide: {
    margin: '0 0 0 auto'
  },
  addAccount: {
    margin: '0 0 0 auto',
    padding: '0 30px',
    height: '71px',
    display: 'flex',
    alignItems: 'center',
    borderRight: '1px solid #CCE1F7',
    cursor: 'pointer',
    '& svg': {
      display: 'block',
      width: '20px',
      color: theme.palette.text.disabled
    }
  },
  badge: {
    height: '15px',
    minWidth: '15px',
    padding: '0 3px',
    fontSize: '9px'
  }
}));

function TopNavbar(props) {
  const {
    history,
    userInfo,
    toggleMenu,
    isMenuOpen,
    isSystem,
    handleOpenLogout,
    handleOpenAddAccount,
    addWalkthroughItem
  } = props;
  const classes = useStyles();

  const windowSize = useWindowSize();

  // Walkthrough
  const walkThrough14Ref = useRef(null);

  useEffect(() => {
    if (
      windowSize.width > 960 &&
      userInfo &&
      userInfo.registration &&
      userInfo.registration === 'walkthrough'
    ) {
      if (walkThrough14Ref.current) {
        addWalkthroughItem({
          id: 14,
          nodeEl: walkThrough14Ref,
          text:
            'Add more credit cards, loans, investments, and checking accounts.'
        });
      }
    }
  });

  try {
    return (
      <div className={classes.navbarWrapper}>
        <div className={classes.container}>
          <Link to="/" className={classes.logo}>
            <img src={logo} alt="Empathize" />
          </Link>

          {isSystem ? (
            <div
              className={`${classes.topRight} ${
                isMenuOpen ? classes.openedMenu : ''
              }`}
            >
              {history.location.pathname !== '/registration' && (
                <React.Fragment>
                  <Link to="/signin" className={classes.link}>
                    Sign in
                  </Link>
                  <Link to="/registration" className={classes.btn}>
                    Get Started
                  </Link>
                </React.Fragment>
              )}
            </div>
          ) : (
            <div
              className={classes.addAccount}
              role="presentation"
              onClick={handleOpenAddAccount}
              ref={walkThrough14Ref}
            >
              <Badge
                badgeContent="+"
                color="primary"
                classes={{ badge: classes.badge }}
              >
                <Icon icon="overview" />
              </Badge>
            </div>
          )}

          {windowSize.width > 600 && userInfo && !isSystem && (
            <AccountData
              userInfo={userInfo}
              pathname={history.location.pathname}
              handleOpenLogout={handleOpenLogout}
            />
          )}

          {history.location.pathname !== '/registration' && (
            <div
              className={`${classes.hamb} ${isSystem ? classes.rightSide : ''}`}
            >
              <Hamburger
                toggled={isMenuOpen}
                toggle={toggleMenu}
                color="#212533"
              />
            </div>
          )}
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

TopNavbar.defaultProps = {
  history: undefined,
  userInfo: undefined,
  toggleMenu: undefined,
  isMenuOpen: undefined,
  isSystem: undefined,
  handleOpenLogout: undefined,
  handleOpenAddAccount: undefined,
  addWalkthroughItem: undefined
};

TopNavbar.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string
    })
  }),
  userInfo: PropTypes.shape({
    registration: PropTypes.string
  }),
  toggleMenu: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  isSystem: PropTypes.bool,
  handleOpenLogout: PropTypes.func,
  handleOpenAddAccount: PropTypes.func,
  addWalkthroughItem: PropTypes.func
};

export default withRouter(TopNavbar);
