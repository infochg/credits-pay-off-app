import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import TotalData from '../../components/MakePlan/TotalData';
import TotalPayments from '../../components/MakePlan/TotalPayments';
import TotalPaymentsChart from '../../components/MakePlan/TotalPaymentsChart';
import PayOffSorting from '../../components/MakePlan/PayOffSorting';
import CardItem from '../../components/MakePlan/CardItem';
import Preloader from '../../components/Common/Preloader';
import planCalc from '../../utils/planCalc';
import ErrorBoundary from '../../containers/ErrorBoundary';

import { PAYMENTS_DATA_REQUEST } from '../../redux/actions/actionTypes';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    width: '100%'
  },
  container: {
    margin: '0',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  payOffContainer: {
    margin: '-30px 0',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  noDataText: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    padding: '22px 0 0 0',
    '& b': {
      color: theme.palette.text.primary
    }
  }
}));

function MakePlan(props) {
  const { paymentsData, fetchPaymentsData } = props;
  const classes = useStyles();
  const [defaultMinPayment, setDefaultMinPayment] = useState(0); // we need this to get default minPayment parameter for Total Payments slider
  const [paymentPerMonth, setPaymentPerMonth] = useState(0); // we need this parameter to get data from slider and send it to other components (default value is generated from all cards min payment summ)
  const [sortedData, setSortedData] = useState([]); // this is array of sorted data from sorting component or after manual sorting byt drag'n'drop cards
  const [isManuallySorted, setIsManuallySorted] = useState(false); // if user changed cards order manually by drag'n'drop we set this param to true, so sorting component not sorting data anymore

  useEffect(() => {
    if (!paymentsData) {
      fetchPaymentsData();
    }
  }, [paymentsData, fetchPaymentsData]);

  // calc Minimum payment from all cards
  useEffect(() => {
    if (sortedData.length > 0 && defaultMinPayment === 0) {
      let minPayment = sortedData
        .map(item => item.minimumPayment)
        .reduce((a, b) => a + b, 0);

      if (minPayment < 1) {
        minPayment = 30;
      }

      const totalBalance = sortedData
        .map(item => item.balance)
        .reduce((a, b) => a + b, 0);

      setPaymentPerMonth(totalBalance * 0.02);
      setDefaultMinPayment(minPayment);
    }
  }, [sortedData, defaultMinPayment]);

  try {
    // get data for current page from userData
    let makePlanData = [];

    if (paymentsData) {
      if (paymentsData.accounts) {
        Object.values(paymentsData.accounts).map(item => {
          makePlanData = makePlanData.concat(item);
          return null;
        });
      } else {
        makePlanData = paymentsData.slice(0);
      }

      makePlanData = makePlanData.map(item => {
        let minimumPayment = 0;

        if (item.minimumPayment) {
          minimumPayment = item.minimumPayment;
        } else if (typeof item.nextPayment === 'number') {
          minimumPayment = item.nextPayment;
        } else if (typeof item.nextPayment === 'object') {
          minimumPayment = item.nextPayment.amount;
        } else if (typeof item.lastPayment === 'number') {
          minimumPayment = item.lastPayment;
        } else if (typeof item.lastPayment === 'object') {
          minimumPayment = item.lastPayment.amount;
        }

        return {
          name: item.name,
          balance: item.currentBalance,
          interest: item.interest.apr,
          minimumPayment,
          image: item.image,
          annualFeeAmount: item.annualFeeAmount,
          annualFeeDate: item.annualFeeDate
        };
      });
    }

    // change Payment per month with slider
    const changePaymentPerMonth = value => setPaymentPerMonth(value);

    // sort cards manually
    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = sortedData[dragIndex];
      setSortedData(
        update(sortedData, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );

      if (!isManuallySorted) {
        setIsManuallySorted(true);
      }
    };

    // sort cards by avalanche/showball
    const sortData = data => {
      setSortedData(data);
      setIsManuallySorted(false);
    };

    // calculating plan (this is array of cards with total data from Plan calculation)
    const calculatedData = planCalc(sortedData, paymentPerMonth);

    // calc TotalData
    let totalData = {};
    if (
      calculatedData &&
      calculatedData.cards &&
      calculatedData.cards.length > 0
    ) {
      totalData = {
        totalBalance: calculatedData.cards
          .map(item => item.balance)
          .reduce((a, b) => a + b, 0),
        debtFreeDate:
          calculatedData.cards[0].payOffDate !== 'N/A'
            ? calculatedData.cards
                .map(item => item.payOffDate)
                .reduce(
                  (a, b) => (moment(new Date(a)).isAfter(new Date(b)) ? a : b),
                  ''
                )
            : 'N/A',
        totalInterest: calculatedData.cards
          .map(item => item.interestPaid)
          .reduce((a, b) => a + b, 0),
        annualFees: calculatedData.cards
          .map(item => item.annualFeeAmount)
          .reduce((a, b) => a + b, 0),
        cardsNum: calculatedData.cards.length,
        averageInterest: (
          calculatedData.cards
            .map(item =>
              typeof item.interest === 'number' ? item.interest : 20
            )
            .reduce((a, b) => a + b, 0) / calculatedData.cards.length
        ).toFixed(2)
      };
    }

    return (
      <React.Fragment>
        {paymentsData ? (
          <div className={classes.contentWrapper}>
            <Grid
              container
              spacing={3}
              alignItems="stretch"
              className={classes.container}
            >
              <Grid item xs={12} sm={12} md={12}>
                <TotalPayments
                  changePaymentPerMonth={changePaymentPerMonth}
                  defaultMinPayment={defaultMinPayment}
                  paymentPerMonth={paymentPerMonth}
                  totalBalance={totalData.totalBalance}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TotalData data={totalData} />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              alignItems="stretch"
              className={classes.container}
            >
              <Grid item xs={12} sm={12} md={12}>
                <TotalPaymentsChart
                  principalChart={calculatedData.principalChart}
                  interestChart={calculatedData.interestChart}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              alignItems="stretch"
              className={classes.payOffContainer}
            >
              <Grid item xs={12}>
                <PayOffSorting
                  data={makePlanData}
                  setSortedData={sortData}
                  isManuallySorted={isManuallySorted}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              alignItems="stretch"
              className={classes.container}
            >
              <Grid item xs={12}>
                {calculatedData.cards.length > 0 ? (
                  <DndProvider backend={Backend}>
                    {calculatedData.cards.map((item, i) => (
                      <CardItem
                        key={item.name}
                        data={item}
                        index={i}
                        moveCard={moveCard}
                      />
                    ))}
                  </DndProvider>
                ) : (
                  <Typography className={classes.noDataText}>
                    Connect accounts to get data
                  </Typography>
                )}
              </Grid>
            </Grid>
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

MakePlan.defaultProps = {
  paymentsData: undefined,
  fetchPaymentsData: undefined
};

MakePlan.propTypes = {
  paymentsData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]),
  fetchPaymentsData: PropTypes.func
};

const mapStateToProps = state => ({
  paymentsData: state.paymentsData
});

const actionsStateToProps = {
  fetchPaymentsData: () => ({ type: PAYMENTS_DATA_REQUEST })
};

export default connect(mapStateToProps, actionsStateToProps)(MakePlan);
