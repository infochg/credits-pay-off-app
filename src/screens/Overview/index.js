import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Preloader from '../../components/Common/Preloader';
import BalanceChart from '../../components/Overview/BalanceChart';
import PaymentsSummary from '../../components/Overview/PaymentsSummary';
import Subscriptions from '../../components/Overview/Subscriptions';
import ErrorBoundary from '../../containers/ErrorBoundary';
import AccountBalances from '../../components/Overview/AccountBalances';
import OneParamBlock from '../../components/Common/OneParamBlock';
import RecentTransactions from '../../components/Overview/RecentTransactions';

import {
  OVERVIEW_DATA_REQUEST,
  ADD_WALKTHROUGHT_ITEM,
  TOGGLE_ADD_ACCOUNT,
  TRANSACTIONS_DATA_REQUEST,
  SUBSCRIPTIONS_DATA_REQUEST,
  ACCOUNTS_DATA_REQUEST
} from '../../redux/actions/actionTypes';

import overviewDat from '../../mock/overviewData.json';
import transactionsDat from '../../mock/transactionsData.json';
import subscriptionsDat from '../../mock/subsciptionsData.json';
import accountsDat from '../../mock/accountsData.json';

const useStyles = makeStyles(theme => ({
  container: {
    margin: '0',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  fullWidthContainer: {
    margin: '-44px 0 0 0',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  noBotMarginSm: {
    marginBottom: '-44px'
  },
  [theme.breakpoints.down('sm')]: {
    order1: {
      order: '1'
    },
    order2: {
      order: '2'
    },
    order3: {
      order: '3'
    },
    noBotMarginXs: {
      marginBottom: '-44px'
    }
  }
}));

function Overview(props) {
  const {
    userInfo,
    overviewData,
    fetchOverviewData,
    fetchTransactionsData,
    addWalkthroughItem,
    toggleAddAccountModal,
    transactionsData,
    fetchSubscriptionsData,
    subscriptionsData,
    fetchAccountsData,
    accountsData
  } = props;
  const classes = useStyles();

  let overviewValues = { ...overviewData };
  let transactionsValues = { ...transactionsData };
  let subscriptionsValues = subscriptionsData ? subscriptionsData.slice(0) : [];
  let acccountsValues = accountsData ? accountsData.slice(0) : [];

  // load fake data for test@empathize.com
  if (userInfo.email === 'test@empathize.com') {
    overviewValues = { ...overviewDat };
    transactionsValues = { ...transactionsDat };
    subscriptionsValues = subscriptionsDat.slice(0);
    acccountsValues = accountsDat.slice(0);
  }

  // load correct data
  useEffect(() => {
    if (!overviewData) {
      fetchOverviewData();
    }
  }, [overviewData, fetchOverviewData]);

  useEffect(() => {
    if (
      !transactionsData ||
      !transactionsData.transactions ||
      Object.keys(transactionsData.transactions).length > 10
    ) {
      fetchTransactionsData();
    }
  }, [transactionsData, fetchTransactionsData]);

  useEffect(() => {
    if (!subscriptionsData) {
      fetchSubscriptionsData();
    }
  }, [subscriptionsData, fetchSubscriptionsData]);

  useEffect(() => {
    if (!accountsData) {
      fetchAccountsData();
    }
  }, [accountsData, fetchAccountsData]);

  // Walkthrough
  const walkThrough1Ref = useRef(null);
  const walkThrough2Ref = useRef(null);
  const walkThrough3Ref = useRef(null);
  const walkThrough4Ref = useRef(null);
  const walkThrough5Ref = useRef(null);
  const walkThrough6Ref = useRef(null);
  const walkThrough7Ref = useRef(null);
  const walkThrough8Ref = useRef(null);

  useEffect(() => {
    if (userInfo.registration && userInfo.registration === 'walkthrough') {
      if (walkThrough1Ref.current) {
        addWalkthroughItem({
          id: 1,
          nodeEl: walkThrough1Ref,
          text:
            'This is how much cash you have, including: checking, savings, and investments.'
        });
      }
      if (walkThrough2Ref.current) {
        addWalkthroughItem({
          id: 2,
          nodeEl: walkThrough2Ref,
          text:
            'This is the total debt you have, across all your loans and credit cards.'
        });
      }
      if (walkThrough3Ref.current) {
        addWalkthroughItem({
          id: 3,
          nodeEl: walkThrough3Ref,
          text: 'This is how much you made and spent last month.'
        });
      }
      if (walkThrough4Ref.current) {
        addWalkthroughItem({
          id: 4,
          nodeEl: walkThrough4Ref,
          text: 'Here’s the balance on each of your accounts.'
        });
      }
      if (walkThrough5Ref.current) {
        addWalkthroughItem({
          id: 5,
          nodeEl: walkThrough5Ref,
          text: 'This is your balance over time, across all your loans & cards.'
        });
      }
      if (walkThrough6Ref.current) {
        addWalkthroughItem({
          id: 6,
          nodeEl: walkThrough6Ref,
          text: 'This is a high level overview of this month’s payments.'
        });
      }
      if (walkThrough7Ref.current) {
        addWalkthroughItem({
          id: 7,
          nodeEl: walkThrough7Ref,
          text:
            'These are your monthly subscriptions. See if you can cancel subscriptions you’re not using.'
        });
      }
      if (walkThrough8Ref.current) {
        addWalkthroughItem({
          id: 8,
          nodeEl: walkThrough8Ref,
          text: 'Your most recent 10 transactions, across all accounts.',
          scrollLess: 250,
          scroll: true
        });
      }
    }
  });

  try {
    if (overviewValues) {
      return (
        <React.Fragment>
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12} sm={6} className={classes.noBotMarginXs}>
              <div ref={walkThrough1Ref}>
                <OneParamBlock
                  icon="cash-colored"
                  title="Cash & Investments"
                  data={overviewValues.assets}
                  positive
                  tooltip="This includes: checking, savings, Paypal, and investment accounts."
                  titleName="investmentsTitle"
                  valueName="investmentsValue"
                />
              </div>
              <div ref={walkThrough2Ref}>
                <OneParamBlock
                  icon="investments-colored"
                  title="Cards & Loans"
                  data={overviewValues.liabilities}
                  tooltip="This includes: credit cards, student loans, car loans, mortgages, and personal loans."
                  titleName="cardsLoansTitle"
                  valueName="cardsLoansValue"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div ref={walkThrough3Ref}>
                <OneParamBlock
                  icon="basket-colored"
                  title="Spending"
                  description="last month"
                  data={
                    overviewValues.cashFlow &&
                    overviewValues.cashFlow.expensesLastMonth
                      ? overviewValues.cashFlow.expensesLastMonth
                      : null
                  }
                  titleName="spendingTitle"
                  valueName="spendingValue"
                />
                <OneParamBlock
                  icon="wallet-colored"
                  title="Income"
                  description="last month"
                  data={
                    overviewValues.cashFlow &&
                    overviewValues.cashFlow.incomeLastMonth
                      ? overviewValues.cashFlow.incomeLastMonth
                      : null
                  }
                  titleName="incomeTitle"
                  valueName="incomeValue"
                  positive
                />
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            className={classes.fullWidthContainer}
            alignItems="stretch"
          >
            <Grid item xs={12} sm={6} md={4} className={classes.noBotMarginXs}>
              <div ref={walkThrough4Ref} style={{ height: '100%' }}>
                <AccountBalances
                  data={acccountsValues}
                  toggleAddAccountModal={toggleAddAccountModal}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4} className={classes.order3}>
              <div ref={walkThrough5Ref} style={{ height: '100%' }}>
                <BalanceChart
                  data={overviewValues.balanceChart}
                  toggleAddAccountModal={toggleAddAccountModal}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className={classes.noBotMarginXs}>
              <div ref={walkThrough6Ref} style={{ height: '100%' }}>
                <PaymentsSummary
                  data={overviewValues.paymentsSummary}
                  toggleAddAccountModal={toggleAddAccountModal}
                />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.fullWidthContainer}>
            <Grid item xs={12}>
              <div ref={walkThrough7Ref}>
                <Subscriptions
                  data={subscriptionsValues || []}
                  toggleAddAccountModal={toggleAddAccountModal}
                />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.fullWidthContainer}>
            <Grid item xs={12}>
              <div ref={walkThrough8Ref}>
                <RecentTransactions
                  data={transactionsValues || {}}
                  toggleAddAccountModal={toggleAddAccountModal}
                />
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    return <Preloader isCards />;
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Overview.defaultProps = {
  userInfo: undefined,
  overviewData: undefined,
  fetchOverviewData: undefined,
  addWalkthroughItem: undefined,
  toggleAddAccountModal: undefined,
  fetchTransactionsData: undefined,
  transactionsData: undefined,
  fetchSubscriptionsData: undefined,
  subscriptionsData: undefined,
  fetchAccountsData: undefined,
  accountsData: undefined
};

Overview.propTypes = {
  userInfo: PropTypes.shape({
    email: PropTypes.string
  }),
  overviewData: PropTypes.shape({
    balanceChart: PropTypes.shape({
      dailyBalance: PropTypes.arrayOf(PropTypes.shape({}))
    }),
    cashFlow: PropTypes.shape({
      expensesLastMonth: PropTypes.number,
      incomeLastMonth: PropTypes.number
    }),
    upcomingPayments: PropTypes.arrayOf(PropTypes.shape({})),
    principleInterestChart: PropTypes.shape({}),
    paymentsSummary: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({}))
    ]),
    accounts: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({}))
    ]),
    assets: PropTypes.number,
    liabilities: PropTypes.number,
    lastMonthSpending: PropTypes.number,
    lastMonthIncome: PropTypes.number
  }),
  fetchOverviewData: PropTypes.func,
  addWalkthroughItem: PropTypes.func,
  toggleAddAccountModal: PropTypes.func,
  fetchTransactionsData: PropTypes.func,
  transactionsData: PropTypes.shape({}),
  fetchSubscriptionsData: PropTypes.func,
  subscriptionsData: PropTypes.arrayOf(PropTypes.shape({})),
  fetchAccountsData: PropTypes.func,
  accountsData: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  overviewData: state.overviewData,
  transactionsData: state.transactionsData,
  subscriptionsData: state.subscriptionsData,
  accountsData: state.accountsData
});

const actionsStateToProps = {
  fetchOverviewData: () => ({ type: OVERVIEW_DATA_REQUEST }),
  addWalkthroughItem: payload => ({ type: ADD_WALKTHROUGHT_ITEM, payload }),
  toggleAddAccountModal: payload => ({ type: TOGGLE_ADD_ACCOUNT, payload }),
  fetchTransactionsData: () => ({
    type: TRANSACTIONS_DATA_REQUEST,
    payload: { type: 'overview' }
  }),
  fetchSubscriptionsData: () => ({ type: SUBSCRIPTIONS_DATA_REQUEST }),
  fetchAccountsData: () => ({ type: ACCOUNTS_DATA_REQUEST })
};

export default connect(mapStateToProps, actionsStateToProps)(Overview);
