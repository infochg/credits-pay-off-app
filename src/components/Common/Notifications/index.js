import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Badge, Typography } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.min.css';
import Scrollbar from 'react-scrollbars-custom';
import usePortal from 'react-useportal';
import Icon from '../Icon';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Preloader from '../Preloader';

const useStyles = makeStyles(theme => ({
  userNotifications: {
    padding: '0 30px',
    height: '71px',
    display: 'flex',
    alignItems: 'center',
    borderRight: '1px solid #CCE1F7',
    cursor: 'pointer',
    '& svg': {
      display: 'block',
      width: '16px',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('xs')]: {
      order: '2',
      padding: '0 40px',
      border: 'none',
      '& svg': {
        display: 'block',
        width: '16px !important',
        margin: '0 21px 0 8px',
        color: theme.palette.text.disabled
      }
    }
  },
  notifText: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.text.secondary,
      display: 'block'
    }
  },
  badge: {
    height: '15px',
    minWidth: '15px',
    padding: '0 3px',
    fontSize: '9px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 20px 0 0'
    }
  },
  notifWrapper: {
    position: 'absolute',
    zIndex: '9100',
    top: '103px',
    right: '20px',
    width: '555px',
    maxWidth: 'calc(100% - 40px)',
    boxSizing: 'border-box',
    background: '#fff',
    border: '1px solid #D4DEE8',
    boxShadow: '0px 4px 8px rgba(119, 140, 162, 0.4)',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      position: 'fixed'
    }
  },
  notifHead: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #D4DEE8'
  },
  title: {
    fontSIze: '22px',
    fontWeight: '900'
  },
  close: {
    margin: '0 0 0 auto',
    width: '15px',
    color: theme.palette.text.secondary,
    cursor: 'pointer'
  },
  notifications: {
    height: '300px',
    maxHeight: '60%',
    '& div.ScrollbarsCustom-Track': {
      background: 'rgba(240,244,249, 0.8) !important',
      borderRadius: '0 0 5px 0 !important',
      top: '0 !important',
      height: '100% !important'
    },
    '& div.ScrollbarsCustom-Thumb': {
      width: '5px !important',
      background: '#CCE1F7 !important',
      margin: '2px 0 2px 3px !important'
    }
  },
  notification: {
    padding: '15px',
    display: 'flex',
    alignItems: 'flex-start',
    borderBottom: '1px solid #D4DEE8',
    '&:last-child': {
      border: 'none'
    }
  },
  dot: {
    fontSize: '30px',
    lineHeight: '30px',
    color: '#CCE1F7',
    margin: '-3px 20px 0 10px'
  },
  error: {
    color: '#FF4242'
  },
  success: {
    color: '#65C842'
  },
  info: {
    color: '#2D47FE'
  },
  notifTitle: {
    fontSize: '16px',
    fontWeight: '900'
  },
  notifMessage: {
    fontSize: '16px',
    color: theme.palette.text.secondary
  }
}));

function Notifications(props) {
  const classes = useStyles();
  const { notificationsData, clearNotifications } = props;
  const { openPortal, closePortal, isOpen, Portal } = usePortal();

  try {
    const closeNotifBox = () => {
      closePortal();
      clearNotifications();
    };

    return (
      <React.Fragment>
        <div
          className={classes.userNotifications}
          role="presentation"
          onClick={openPortal}
        >
          {notificationsData ? (
            <Badge
              badgeContent={
                notificationsData.filter(item => item.status !== 'clear').length
              }
              color="primary"
              classes={{ badge: classes.badge }}
            >
              <Icon icon="notification" />
            </Badge>
          ) : (
            <Icon icon="notification" />
          )}{' '}
          <div className={classes.notifText}>Notifications</div>
        </div>
        {isOpen && (
          <Portal>
            <div className={classes.notifWrapper}>
              <div className={classes.notifHead}>
                <Typography className={classes.title}>
                  All Notifications
                </Typography>
                <Icon
                  icon="close"
                  className={classes.close}
                  role="presentation"
                  onClick={closeNotifBox}
                />
              </div>
              <div className={classes.notifications}>
                <Scrollbar style={{ width: '100%', height: '100%' }}>
                  {notificationsData ? (
                    notificationsData.map(item => {
                      return (
                        <div key={item.id} className={classes.notification}>
                          <Typography
                            className={`${classes.dot} ${classes[item.status]}`}
                          >
                            &#8226;
                          </Typography>
                          <div>
                            <Typography className={classes.notifTitle}>
                              {item.title}
                            </Typography>
                            <Typography className={classes.notifMessage}>
                              {item.body}
                            </Typography>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Preloader />
                  )}
                </Scrollbar>
              </div>
            </div>
          </Portal>
        )}
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Notifications.propTypes = {
  notificationsData: PropTypes.arrayOf(PropTypes.shape({})),
  clearNotifications: PropTypes.func
};

Notifications.defaultProps = {
  notificationsData: undefined,
  clearNotifications: undefined
};

export default Notifications;
