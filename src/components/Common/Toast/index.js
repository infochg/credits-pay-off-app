import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.min.css';
import Icon from '../Icon';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  notifWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  error: {
    '& svg': {
      color: '#FF4242'
    }
  },
  success: {
    '& svg': {
      color: '#4AC036'
    }
  },
  typeName: {
    fontSize: '16px',
    color: theme.palette.text.primary,
    fontWeight: '900',
    textTransform: 'capitalize'
  },
  message: {
    fontSize: '16px'
  },
  icon: {
    width: '16px',
    margin: '0 25px 0 10px'
  }
}));

function Toast(props) {
  const classes = useStyles();
  const { message, type } = props;

  try {
    return (
      <div className={`${classes.notifWrapper} ${classes[type]}`}>
        <Icon icon="notification" className={classes.icon} />
        <div>
          <Typography className={classes.typeName}>{type}</Typography>
          <Typography className={classes.message}>{message}</Typography>
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
};

Toast.defaultProps = {
  message: undefined,
  type: undefined
};

export default Toast;
