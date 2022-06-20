import React, { useState } from 'react';
// import amplitude from 'amplitude-js';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography, ClickAwayListener } from '@material-ui/core';
import Icon from '../Icon';
import { userRoutes } from '../../../routes';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import NotificationsContainer from '../../../containers/NotificationsContainer';

const useStyles = makeStyles(theme => ({
  accountDataWrapper: {
    display: 'inline-flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      margin: '-21px 0 -10px 0'
    }
  },
  userDataWrapper: {
    position: 'relative'
  },
  userDataBlock: {
    padding: '0 30px',
    height: '71px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      borderRight: '1px solid #CCE1F7'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  userData: {
    color: theme.palette.text.primary,
    fontSize: '14px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '140px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px'
    }
  },
  arrowDown: {
    display: 'block',
    width: '10px',
    color: theme.palette.text.primary,
    marginLeft: '20px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 0 0 auto'
    }
  },
  userMenu: {
    position: 'absolute',
    zIndex: '9000',
    top: '72px',
    right: '0',
    padding: '0',
    background: '#fff',
    width: '250px',
    boxShadow: '0px 4px 8px rgba(119, 140, 162, 0.4)',
    textAlign: 'center',
    maxHeight: '0',
    overflowY: 'hidden',
    opacity: '0',
    transition: 'all 0.3s'
  },
  openedMenu: {
    maxHeight: '3000px',
    overflowY: 'visible',
    opacity: '1'
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
    '& a': {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.secondary,
      textDecoration: 'none'
    },
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
      '& a': {
        color: theme.palette.primary.main
      },
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
    '& a': {
      color: theme.palette.primary.main,
      '& svg': {
        color: theme.palette.primary.main
      }
    }
  },
  hideOverflow: {
    fontSize: '18px',
    maxWidth: 'calc(100% - 38px)',
    minWidth: 'calc(100% - 38px)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'left',
    overflow: 'hidden'
  }
}));

function AccountData(props) {
  const { userInfo, pathname, handleOpenLogout } = props;
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuBtnRef = React.useRef(null);

  try {
    const toggleUserMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      // amplitude.getInstance().logEvent('testEvent');
    };

    const handleCloseUserMenu = event => {
      if (menuBtnRef.current && menuBtnRef.current.contains(event.target)) {
        return;
      }

      setIsMenuOpen(false);
    };

    return (
      <React.Fragment>
        <div className={classes.accountDataWrapper}>
          <NotificationsContainer />
          <div className={classes.userDataWrapper}>
            <div
              className={classes.userDataBlock}
              role="presentation"
              onClick={toggleUserMenu}
              ref={menuBtnRef}
            >
              <Typography className={classes.userData}>
                {userInfo.email !== 'test@empathize.com'
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : 'Sarah'}
              </Typography>
              <Icon icon="arrow-down" className={classes.arrowDown} />
            </div>
            <ClickAwayListener onClickAway={handleCloseUserMenu}>
              <div
                className={`${classes.userMenu} ${
                  isMenuOpen ? classes.openedMenu : ''
                }`}
              >
                {userRoutes.map(item => (
                  <div
                    className={`${classes.menuItem} ${
                      pathname === item.path ? classes.activeMenuItem : ''
                    }`}
                    key={item.title}
                  >
                    <Link to={item.path}>
                      <Icon icon={item.icon} />{' '}
                      <Typography className={classes.hideOverflow}>
                        {item.title}
                      </Typography>
                    </Link>
                  </div>
                ))}
                <div
                  className={classes.menuItem}
                  role="presentation"
                  onClick={handleOpenLogout}
                >
                  <Icon icon="logout" />{' '}
                  <Typography className={classes.hideOverflow}>
                    Log Out
                  </Typography>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

AccountData.defaultProps = {
  userInfo: undefined,
  pathname: undefined,
  handleOpenLogout: undefined
};

AccountData.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }),
  pathname: PropTypes.string,
  handleOpenLogout: PropTypes.func
};

export default AccountData;
