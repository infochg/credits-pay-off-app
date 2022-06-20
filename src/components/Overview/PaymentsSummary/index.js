import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Card, CardContent, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';

import noData from '../../../assets/img/no-data.svg';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
    transition: 'all 0.2s',
    height: 'calc(100% - 40px)',
    '&:hover': {
      transform: 'scale(1.03)'
    }
  },
  titleWrapper: {
    display: 'flex'
  },
  title: {
    fontSize: '22px',
    fontWeight: '900',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  titleLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: 'all 0.2s',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  paymentItem: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    padding: '4px 0'
  },
  paymentAmount: {
    display: 'inline-flex',
    fontSize: '16px',
    color: theme.palette.text.primary,
    fontWeight: '900'
  },
  noDataText: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    padding: '22px 0 0 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& b': {
      color: theme.palette.text.primary
    },
    '& img': {
      maxWidth: '60%',
      marginBottom: '10px'
    }
  }
}));

function PaymentsSummary(props) {
  const { data } = props;
  const classes = useStyles();

  let thisMonthPayments = 0;
  let paymentsMade = 0;
  let nextPaymentDue;
  if (data) {
    if (data[0]) {
      thisMonthPayments = data[0].thisMonthPayments;
      paymentsMade = data[0].paymentsMade;
      nextPaymentDue = data[0].nextPaymentDue;
    } else {
      thisMonthPayments = data.thisMonthPayments;
      paymentsMade = data.paymentsMade;
      nextPaymentDue = data.nextPaymentDue;
    }
  }

  try {
    return (
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.titleWrapper}>
            <Link to="/payments" className={classes.titleLink}>
              <Typography className={classes.title}>
                Payments summary
              </Typography>
            </Link>
          </div>
          {thisMonthPayments !== 0 && paymentsMade !== 0 && nextPaymentDue ? (
            <React.Fragment>
              <div className={classes.paymentItem}>
                <span name="curMonthPaymentsTitle">
                  {moment().format('MMMM')} payments:{' '}
                </span>
                <Typography
                  className={classes.paymentAmount}
                  name="curMonthPaymentsValue"
                >
                  {thisMonthPayments || thisMonthPayments === 0
                    ? numberWithCommas(thisMonthPayments, true, 2)
                    : 'N/A'}
                </Typography>
              </div>
              <div className={classes.paymentItem}>
                <span name="paymentsMadeTitle">Payments made:</span>{' '}
                <Typography
                  className={classes.paymentAmount}
                  name="paymentsMadeValue"
                >
                  {paymentsMade || paymentsMade === 0
                    ? numberWithCommas(paymentsMade, true, 2)
                    : 'N/A'}
                </Typography>
              </div>
              <div className={classes.paymentItem}>
                <span name="nextPaymentTitle">Next Payment due:</span>{' '}
                <Typography
                  className={classes.paymentAmount}
                  name="nextPaymentValue"
                >
                  {nextPaymentDue
                    ? moment(nextPaymentDue).format('MMMM DD')
                    : 'N/A'}
                </Typography>
              </div>
            </React.Fragment>
          ) : (
            <Typography className={classes.noDataText}>
              <img src={noData} alt="" />
              <b>No data</b>
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

PaymentsSummary.defaultProps = {
  data: undefined,
  toggleAddAccountModal: undefined
};

PaymentsSummary.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape({
      thisMonthPayments: PropTypes.number,
      paymentsMade: PropTypes.number,
      nextPaymentDue: PropTypes.string
    }),
    PropTypes.arrayOf(PropTypes.shape({}))
  ]),
  toggleAddAccountModal: PropTypes.func
};

export default PaymentsSummary;
