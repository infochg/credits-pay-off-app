import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  sortWrapper: {
    padding: '15px 40px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      padding: '15px 20px'
    }
  },
  title: {
    fontSize: '20px',
    fontWeight: '900',
    marginRight: '6%',
    whiteSpace: 'nowrap',
    lineHeight: '25px',
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
      margin: '0 0 10px 0'
    }
  },
  sortItem: {
    color: theme.palette.text.secondary,
    opacity: '0.5',
    padding: '0 10px',
    fontSize: '15px',
    lineHeight: '28px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      opacity: '1'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 15px 0 0'
    }
  },
  sortItemActive: {
    color: '#000',
    padding: '0 10px',
    fontSize: '15px',
    lineHeight: '28px',
    fontWeight: '500',
    [theme.breakpoints.down('xs')]: {
      padding: '0 15px 0 0'
    }
  }
}));

const sortItems = ['All'];

function SubscriptionSorting(props) {
  const { data, setData } = props;
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState('All');

  const sortByDate = () => {
    const inputData = data.slice(0);

    // sort data by date
    inputData.sort((a, b) => {
      return moment(a.billDate) - moment(b.billDate);
    });

    // split subscriptions by date
    const outputData = {
      previousPayments: [],
      thisWeek: [],
      in2Weeks: [],
      in3Weeks: [],
      futurePayments: []
    };

    inputData.map(item => {
      if (moment(item.billDate).isAfter(moment())) {
        if (moment(item.billDate).isBefore(moment().add(7, 'days'))) {
          outputData.thisWeek.push(item);
        } else if (
          moment(item.billDate).isAfter(moment().add(7, 'days')) &&
          moment(item.billDate).isBefore(moment().add(14, 'days'))
        ) {
          outputData.in2Weeks.push(item);
        } else if (
          moment(item.billDate).isAfter(moment().add(14, 'days')) &&
          moment(item.billDate).isBefore(moment().add(21, 'days'))
        ) {
          outputData.in3Weeks.push(item);
        } else {
          outputData.futurePayments.push(item);
        }
      } else if (moment(item.billDate).isBefore(moment())) {
        outputData.previousPayments.push(item);
      }

      return null;
    });

    // return splitted object
    setData(outputData);
  };

  const sortByAmount = () => {
    const inputData = data.slice(0);

    // sort data by date
    inputData.sort((a, b) => {
      return b.amount - a.amount;
    });

    // split subscriptions by date
    const outputData = {
      all: inputData
    };

    // return splitted object
    setData(outputData);
  };

  const sortByPaymentMade = param => {
    const inputData = data.slice(0);

    // sort data by date
    inputData.sort((a, b) => {
      return moment(a.billDate) - moment(b.billDate);
    });

    // filter subscriptions
    const outputData = {};
    if (param === 'Paid') {
      outputData.paid = inputData.filter(item => item.paymentMade === true);
    } else if (param === 'Upcoming') {
      outputData.upcoming = inputData.filter(
        item => item.paymentMade === false
      );
    }

    // return object
    setData(outputData);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      if (activeItem === 'All') {
        if (data[0].billDate) {
          sortByDate();
        } else {
          sortByAmount();
        }
      } else if (activeItem === 'Paid') {
        sortByPaymentMade('Paid');
      } else if (activeItem === 'Upcoming') {
        sortByPaymentMade('Upcoming');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, activeItem]);

  try {
    return (
      <div className={classes.sortWrapper}>
        <Typography className={classes.title}>Subscription</Typography>
        {sortItems.map(item => (
          <Typography
            key={item}
            className={
              activeItem === item ? classes.sortItemActive : classes.sortItem
            }
            onClick={() => {
              setActiveItem(item);
            }}
          >
            {item}
          </Typography>
        ))}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

SubscriptionSorting.defaultProps = {
  data: undefined,
  setData: undefined
};

SubscriptionSorting.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      billDate: PropTypes.string
    })
  ),
  setData: PropTypes.func
};

export default SubscriptionSorting;
