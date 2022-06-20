import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Typography } from '@material-ui/core';
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
  infoItem: {
    flexGrow: '1',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '18px',
    fontWeight: '900',
    padding: '23px 20px',
    borderRight: `1px solid ${theme.palette.text.disabled}`,
    '&:last-child': {
      borderRight: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      borderRight: 'none',
      textAlign: 'left',
      padding: '5px 40px'
    }
  },
  infoValue: {
    color: 'rgba(45,71,254, 0.75)',
    display: 'inline-flex',
    paddingLeft: '10px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 0 0 auto'
    }
  }
}));

function PaymentsInfo(props) {
  const { data } = props;
  const classes = useStyles();

  try {
    let totalPayments = 0;
    let paid = 0;
    let nextPayment;

    // collect all cards into one array
    if (data) {
      let inputData = [];
      if (data.accounts) {
        Object.values(data.accounts).map(item => {
          inputData = inputData.concat(item);
          return null;
        });
      } else {
        inputData = data.slice(0);
      }

      inputData.map(item => {
        // getting total payments in current month
        if (
          moment().format('MMMM') ===
          moment(item.lastPaymentDate).format('MMMM')
        ) {
          if (typeof item.lastPayment === 'number') {
            totalPayments += item.lastPayment;
          } else if (typeof item.lastPayment === 'object') {
            totalPayments += item.lastPayment.amount;
          }
        } else if (
          moment().format('MMMM') ===
          moment(item.nextPaymentDate).format('MMMM')
        ) {
          if (typeof item.nextPayment === 'number') {
            totalPayments += item.nextPayment;
          } else if (typeof item.nextPayment === 'object') {
            totalPayments += item.nextPayment.amount;
          }
        }

        // getting paid payments in current month
        if (item.paymentMade) {
          if (
            item.lastPaymentDate &&
            moment().format('MMMM') ===
              moment(item.lastPaymentDate).format('MMMM')
          ) {
            if (typeof item.lastPayment === 'number') {
              paid += item.lastPayment;
            } else if (typeof item.lastPayment === 'object') {
              paid += item.lastPayment.amount;
            }
          } else if (
            item.nextPaymentDate &&
            moment().format('MMMM') ===
              moment(item.nextPaymentDate).format('MMMM')
          ) {
            if (typeof item.nextPayment === 'number') {
              paid += item.nextPayment;
            } else if (typeof item.nextPayment === 'object') {
              paid += item.nextPayment.amount;
            }
          }
        }

        // getting nearest payment date
        if (
          item.nextPaymentDate &&
          moment(new Date()).isBefore(item.nextPaymentDate)
        ) {
          if (nextPayment === undefined) {
            nextPayment = item.nextPaymentDate;
          } else if (moment(item.nextPaymentDate).isBefore(nextPayment)) {
            nextPayment = item.nextPaymentDate;
          }
        }
        return null;
      });
    }

    return (
      <div className={classes.infoWrapper}>
        <div className={classes.infoItem}>
          {moment().format('MMMM')} Payments:
          <Typography className={classes.infoValue}>
            {numberWithCommas(totalPayments, true, 2)}
          </Typography>
        </div>
        <div className={classes.infoItem}>
          Paid:
          <Typography className={classes.infoValue}>
            {' '}
            {numberWithCommas(paid, true, 2)}
          </Typography>
        </div>
        <div className={classes.infoItem}>
          Next Payment:
          <Typography className={classes.infoValue}>
            {nextPayment ? moment(nextPayment).format('MMMM DD') : 'N/A'}
          </Typography>
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

PaymentsInfo.defaultProps = {
  data: undefined
};

PaymentsInfo.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ])
};

export default PaymentsInfo;
