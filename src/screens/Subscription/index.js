import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Preloader from '../../components/Common/Preloader';
import SubscriptionInfo from '../../components/Subscription/SubscriptionInfo';
import SubscriptionSorting from '../../components/Subscription/SubscriptionSorting';
import SubscriptionsGroup from '../../components/Subscription/SubscriptionsGroup';
import ErrorBoundary from '../../containers/ErrorBoundary';

import {
  SUBSCRIPTIONS_DATA_REQUEST,
  TOGGLE_ADD_ACCOUNT
} from '../../redux/actions/actionTypes';

import subscriptionsDat from '../../mock/subsciptionsData.json';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    width: '100%'
  },
  noDataText: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    padding: '0 40px',
    '& b': {
      color: theme.palette.text.primary
    }
  },
  link: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    borderBottom: '1px solid transparent',
    transition: 'all 0.2s',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.primary.main}`
    }
  }
}));

function Subscription(props) {
  const {
    userInfo,
    subscriptionsData,
    fetchSubscriptionsData,
    toggleAddAccountModal
  } = props;
  const classes = useStyles();
  const [subscriptionsValues, setSubscriptionsValues] = useState([]);
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    if (!subscriptionsData) {
      fetchSubscriptionsData();
    }
  }, [subscriptionsData, fetchSubscriptionsData]);

  useEffect(() => {
    // load fake data for test@empathize.com
    if (userInfo.email === 'test@empathize.com') {
      setSubscriptionsValues(subscriptionsDat.slice(0));
    } else if (subscriptionsData) {
      setSubscriptionsValues(subscriptionsData.slice(0));
    }
  }, [userInfo, subscriptionsData, setSubscriptionsValues]);

  try {
    const setData = data => {
      setFilteredData(data);
    };

    let subscriptionsArray = [];
    if (filteredData) {
      Object.values(filteredData).map(item => {
        subscriptionsArray = subscriptionsArray.concat(item);
        return null;
      });
    }

    return (
      <React.Fragment>
        {subscriptionsValues ? (
          <div className={classes.contentWrapper}>
            <SubscriptionInfo data={subscriptionsValues || []} />

            <SubscriptionSorting
              data={subscriptionsValues || []}
              setData={setData}
            />
            {subscriptionsArray.length > 0 ? (
              Object.keys(filteredData).map(item => {
                if (filteredData[item].length > 0) {
                  return (
                    <SubscriptionsGroup
                      key={item}
                      groupName={item}
                      subscriptions={filteredData[item]}
                    />
                  );
                }
                return null;
              })
            ) : (
              <Typography className={classes.noDataText}>
                Congratulations! There are no subscriptions in your accounts :)
                <br />
                Click to{' '}
                <span
                  role="presentation"
                  onClick={() =>
                    toggleAddAccountModal({
                      isOpen: true
                    })
                  }
                  className={classes.link}
                >
                  connect more accounts
                </span>
              </Typography>
            )}
          </div>
        ) : (
          <Preloader isCards />
        )}
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Subscription.defaultProps = {
  subscriptionsData: undefined,
  fetchSubscriptionsData: undefined,
  toggleAddAccountModal: undefined,
  userInfo: undefined
};

Subscription.propTypes = {
  subscriptionsData: PropTypes.arrayOf(PropTypes.shape({})),
  fetchSubscriptionsData: PropTypes.func,
  toggleAddAccountModal: PropTypes.func,
  userInfo: PropTypes.shape({
    email: PropTypes.string
  })
};

const mapStateToProps = state => ({
  subscriptionsData: state.subscriptionsData,
  userInfo: state.userInfo
});

const actionsStateToProps = {
  fetchSubscriptionsData: () => ({ type: SUBSCRIPTIONS_DATA_REQUEST }),
  toggleAddAccountModal: payload => ({ type: TOGGLE_ADD_ACCOUNT, payload })
};

export default connect(mapStateToProps, actionsStateToProps)(Subscription);
