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

const sortItems = ['Payment Date', 'Paid', 'Unpaid'];

function CardsSorting(props) {
  const { data, setData } = props;
  const classes = useStyles();

  const [activeItem, setActiveItem] = useState('Payment Date');

  const sortByDate = () => {
    // collect all cards into one array
    let inputData = [];
    if (data.accounts) {
      Object.values(data.accounts).map(item => {
        inputData = inputData.concat(item);
        return null;
      });
    } else {
      inputData = data.slice(0);
    }

    // sort data by date
    inputData.sort((a, b) => {
      return moment(a.nextPaymentDate) - moment(b.nextPaymentDate);
    });

    // split cards by date
    const outputData = {
      previously: [],
      thisWeek: [],
      in2Weeks: [],
      in3Weeks: [],
      futurePayments: []
    };
    inputData.map(item => {
      if (moment(item.nextPaymentDate).isBefore(moment())) {
        outputData.previously.push(item);
      } else if (
        moment(item.nextPaymentDate).isAfter(moment().subtract(1, 'days'))
      ) {
        if (moment(item.nextPaymentDate).isBefore(moment().add(7, 'days'))) {
          outputData.thisWeek.push(item);
        } else if (
          moment(item.nextPaymentDate).isAfter(moment().add(7, 'days')) &&
          moment(item.nextPaymentDate).isBefore(moment().add(14, 'days'))
        ) {
          outputData.in2Weeks.push(item);
        } else if (
          moment(item.nextPaymentDate).isAfter(moment().add(14, 'days')) &&
          moment(item.nextPaymentDate).isBefore(moment().add(21, 'days'))
        ) {
          outputData.in3Weeks.push(item);
        } else {
          outputData.futurePayments.push(item);
        }
      } else if (item.nextPaymentDate === null) {
        outputData.futurePayments.push(item);
      }
      return null;
    });

    // return splitted object
    setData(outputData);
  };

  const sortByType = () => {
    let outputData = [];
    if (data.accounts) {
      outputData = { ...data.accounts };
    } else {
      outputData = { creditCards: data.slice(0) };
    }
    setData(outputData);
  };

  const sortByPaymentMade = param => {
    // collect all cards into one array
    let inputData = [];
    if (data.accounts) {
      Object.values(data.accounts).map(item => {
        inputData = inputData.concat(item);
        return null;
      });
    } else {
      inputData = data.slice(0);
    }

    // sort data by date
    inputData.sort((a, b) => {
      return moment(a.nextPaymentDate) - moment(b.nextPaymentDate);
    });

    // filter cards
    const outputData = {};
    if (param === 'Paid') {
      outputData.paid = inputData.filter(item => item.paymentMade === true);
    } else if (param === 'Unpaid') {
      outputData.unpaid = inputData.filter(item => item.paymentMade === false);
    }

    // return object
    setData(outputData);
  };

  useEffect(() => {
    if (data) {
      if (activeItem === 'Payment Date') {
        sortByDate();
      } else if (activeItem === 'Type') {
        sortByType();
      } else if (activeItem === 'Paid') {
        sortByPaymentMade('Paid');
      } else if (activeItem === 'Unpaid') {
        sortByPaymentMade('Unpaid');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, activeItem]);

  try {
    return (
      <div className={classes.sortWrapper}>
        <Typography className={classes.title}>Upcoming Payments</Typography>
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

CardsSorting.defaultProps = {
  data: undefined,
  setData: undefined
};

CardsSorting.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]),
  setData: PropTypes.func
};

export default CardsSorting;
