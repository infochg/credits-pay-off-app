import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import SubscriptionCard from '../SubscriptionCard';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  groupWrapper: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    borderRadius: '5px',
    background: '#fff',
    margin: '0 20px 20px 20px'
  },
  groupNameWrapper: {
    padding: '20px',
    display: 'flex'
  },
  groupName: {
    fontSize: '20px',
    lineHeight: '25px',
    fontWeight: '900'
  },
  dot: {
    color: theme.palette.primary.main,
    fontSize: '80px',
    fontWeight: '900',
    lineHeight: '20px',
    paddingRight: '10px'
  }
}));

function SubscriptionsGroup(props) {
  const { groupName, subscriptions } = props;
  const classes = useStyles();

  try {
    const groupNames = {
      all: 'All',
      thisWeek: 'This Week',
      in2Weeks: 'In 2 Weeks',
      in3Weeks: 'In 3 Weeks',
      futurePayments: 'Future Payments',
      previousPayments: 'Previous Payments',
      paid: 'Paid',
      unpaid: 'Upcoming'
    };

    return (
      <div className={classes.groupWrapper}>
        <div className={classes.groupNameWrapper}>
          <Typography className={classes.dot}>·</Typography>{' '}
          <Typography className={classes.groupName}>
            {groupNames[groupName]}
          </Typography>
        </div>
        {subscriptions.map(item => (
          <SubscriptionCard key={item.name} data={item} />
        ))}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

SubscriptionsGroup.defaultProps = {
  groupName: undefined,
  subscriptions: undefined
};

SubscriptionsGroup.propTypes = {
  groupName: PropTypes.string,
  subscriptions: PropTypes.arrayOf(PropTypes.shape({}))
};

export default SubscriptionsGroup;
