import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Preloader from '../../components/Common/Preloader';
import ErrorBoundary from '../../containers/ErrorBoundary';
import TransactionsFilter from '../../components/Transactions/TransactionsFilter';
import TransactionsTable from '../../components/Transactions/TransactionsTable';
import OneParamBlock from '../../components/Common/OneParamBlock';

import {
  OVERVIEW_DATA_REQUEST,
  TRANSACTIONS_DATA_REQUEST
} from '../../redux/actions/actionTypes';
import noData from '../../assets/img/no-data.svg';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    width: '100%'
  },
  container: {
    margin: '0',
    width: '100%'
  },
  containerItem: {
    marginTop: '-10px',
    marginBottom: '-30px',
    padding: '15px !important'
  },
  noDataTextWrapper: {
    textAlign: 'center',
    marginTop: '8%',
    padding: '0 15px'
  },
  noDataText: {
    width: '100%',
    maxWidth: '365px',
    color: theme.palette.text.secondary,
    fontSize: '20px',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    '& b': {
      color: theme.palette.text.primary
    },
    '& img': {
      margin: '20px auto',
      width: '200px'
    }
  }
}));

function Transactions(props) {
  const {
    transactionsData,
    fetchTransactionsData,
    overviewData,
    fetchOverviewData,
    loading
  } = props;
  const classes = useStyles();
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [dataLength, setDataLength] = useState();

  useEffect(() => {
    if (!transactionsData) {
      fetchTransactionsData();
    } else if (
      Object.keys(transactionsData.transactions).length !== dataLength
    ) {
      setDataLength(Object.keys(transactionsData.transactions).length);
      fetchTransactionsData();
    }
  }, [transactionsData, fetchTransactionsData, dataLength]);

  useEffect(() => {
    if (!overviewData) {
      fetchOverviewData();
    }
  }, [overviewData, fetchOverviewData]);

  try {
    return (
      <React.Fragment>
        {transactionsData &&
        Object.keys(transactionsData).length > 0 &&
        !loading ? (
          <div className={classes.contentWrapper}>
            {transactionsData.accounts &&
              Object.keys(transactionsData.accounts).length > 0 && (
                <TransactionsFilter
                  data={transactionsData.transactions}
                  accounts={transactionsData.accounts}
                  setData={setFilteredData}
                  setPage={setPage}
                />
              )}
            {filteredData.length > 0 ? (
              <React.Fragment>
                <Grid container spacing={3} className={classes.container}>
                  <Grid item xs={12} sm={6} className={classes.containerItem}>
                    <OneParamBlock
                      icon="basket-colored"
                      title="Spending"
                      description="last month"
                      data={
                        overviewData.cashFlow &&
                        overviewData.cashFlow.expensesLastMonth
                          ? overviewData.cashFlow.expensesLastMonth
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.containerItem}>
                    <OneParamBlock
                      icon="wallet-colored"
                      title="Income"
                      description="last month"
                      data={
                        overviewData.cashFlow &&
                        overviewData.cashFlow.incomeLastMonth
                          ? overviewData.cashFlow.incomeLastMonth
                          : null
                      }
                      positive
                    />
                  </Grid>
                </Grid>
                <TransactionsTable
                  data={filteredData}
                  page={page}
                  setPage={setPage}
                />
              </React.Fragment>
            ) : (
              <div className={classes.noDataTextWrapper}>
                <Typography className={classes.noDataText}>
                  <img src={noData} alt="" />
                  <b>You have no Transactions!</b>
                  Reload the page or contact support if you don’t see existing
                  transactions
                </Typography>
              </div>
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

Transactions.defaultProps = {
  transactionsData: undefined,
  fetchTransactionsData: undefined,
  overviewData: undefined,
  fetchOverviewData: undefined,
  loading: undefined
};

Transactions.propTypes = {
  transactionsData: PropTypes.shape({
    accounts: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({}))
    ]),
    transactions: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  fetchTransactionsData: PropTypes.func,
  overviewData: PropTypes.shape({}),
  fetchOverviewData: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  transactionsData: state.transactionsData,
  overviewData: state.overviewData,
  loading: state.loading
});

const actionsStateToProps = {
  fetchTransactionsData: () => ({ type: TRANSACTIONS_DATA_REQUEST }),
  fetchOverviewData: () => ({ type: OVERVIEW_DATA_REQUEST })
};

export default connect(mapStateToProps, actionsStateToProps)(Transactions);
