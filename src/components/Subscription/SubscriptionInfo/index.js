import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Typography } from '@material-ui/core';
import Icon from '../../Common/Icon';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  infoWrapper: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    background: '#fff',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      padding: '5px 0'
    }
  },
  halfBlock: {
    display: 'flex',
    justifyContent: 'space-around',
    flexGrow: '1',
    padding: '23px 20px',
    borderRight: `1px solid ${theme.palette.text.disabled}`,
    '&:last-child': {
      border: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      borderRight: 'none',
      borderBottom: `1px solid ${theme.palette.text.disabled}`
    }
  },
  infoItem: {
    flexGrow: '1',
    textAlign: 'left',
    maxWidth: '230px',
    fontSize: '20px',
    fontWeight: '900',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left'
    }
  },
  lastMonth: {
    color: theme.palette.text.secondary,
    '& span': {
      color: theme.palette.text.primary
    }
  },
  value: {
    fontSize: '16px',
    lineHeight: '32px'
  },
  redArrow: {
    width: '10px',
    color: '#FF4242',
    margin: '0 0 0 5px',
    verticalAlign: 'middle'
  },
  greenArrow: {
    width: '10px',
    color: '#4AC036',
    margin: '0 0 0 5px',
    verticalAlign: 'middle',
    transform: 'rotate(-180deg)'
  }
}));

function SubscriptionInfo(props) {
  const classes = useStyles();
  const { data } = props;

  try {
    const totalAmount = data
      .filter(item => moment(item.billDate).isAfter(new Date()))
      .map(item => item.amount)
      .reduce((a, b) => a + b, 0);

    return (
      <div className={classes.infoWrapper}>
        <div className={classes.halfBlock}>
          <div className={classes.infoItem}>
            Subscription
            <Typography className={classes.lastMonth}>last month</Typography>
          </div>
          <div className={classes.infoItem}>
            {totalAmount ? numberWithCommas(totalAmount, true, 2) : 'N/A'}
            <Icon icon="arrow-down" className={classes.redArrow} />
            <Typography className={`${classes.lastMonth} ${classes.value}`}>
              decreased by <span>N/A</span>
            </Typography>
          </div>
        </div>
        <div className={classes.halfBlock}>
          <div className={classes.infoItem}>
            Bills & Utilities
            <Typography className={classes.lastMonth}>last month</Typography>
          </div>
          <div className={classes.infoItem}>
            N/A
            <Icon icon="arrow-down" className={classes.greenArrow} />
            <Typography className={`${classes.lastMonth} ${classes.value}`}>
              decreased by <span>N/A</span>
            </Typography>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

SubscriptionInfo.defaultProps = {
  data: undefined
};

SubscriptionInfo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

export default SubscriptionInfo;
