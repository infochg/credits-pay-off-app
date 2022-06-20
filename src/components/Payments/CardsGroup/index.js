import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import CardInfocard from '../CardInfocard';
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

function CardsGroup(props) {
  const {
    groupName,
    cards,
    userId,
    sendWrongImageReport,
    isWrongImageReqSent,
    resetWrongImageReport,
    loading,
    isGlobalBanner,
    openGlobalBanner,
    closeGlobalBanner,
    isTestAccount
  } = props;
  const classes = useStyles();

  const groupNames = {
    previously: 'Previously',
    thisWeek: 'This Week',
    in2Weeks: 'In 2 Weeks',
    in3Weeks: 'In 3 Weeks',
    futurePayments: 'Future Payments',
    creditCards: 'Credit Cards',
    studentLoans: 'Student Loans',
    mortgage: 'Mortgage',
    medical: 'Medical',
    paid: 'Paid',
    unpaid: 'Unpaid'
  };

  try {
    return (
      <div className={classes.groupWrapper}>
        <div className={classes.groupNameWrapper}>
          <Typography className={classes.dot}>·</Typography>{' '}
          <Typography className={classes.groupName}>
            {groupNames[groupName]}
          </Typography>
        </div>
        {cards.map(item => (
          <CardInfocard
            key={item.name + item.annualFeeDate}
            data={item}
            userId={userId}
            sendWrongImageReport={sendWrongImageReport}
            isWrongImageReqSent={isWrongImageReqSent}
            resetWrongImageReport={resetWrongImageReport}
            loading={loading}
            isGlobalBanner={isGlobalBanner}
            openGlobalBanner={openGlobalBanner}
            closeGlobalBanner={closeGlobalBanner}
            isTestAccount={isTestAccount}
          />
        ))}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

CardsGroup.defaultProps = {
  groupName: undefined,
  cards: undefined,
  userId: undefined,
  sendWrongImageReport: undefined,
  isWrongImageReqSent: undefined,
  resetWrongImageReport: undefined,
  loading: undefined,
  isGlobalBanner: undefined,
  openGlobalBanner: undefined,
  closeGlobalBanner: undefined,
  isTestAccount: undefined
};

CardsGroup.propTypes = {
  groupName: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.shape({})),
  userId: PropTypes.number,
  sendWrongImageReport: PropTypes.func,
  isWrongImageReqSent: PropTypes.bool,
  resetWrongImageReport: PropTypes.func,
  loading: PropTypes.bool,
  isGlobalBanner: PropTypes.shape({}),
  openGlobalBanner: PropTypes.func,
  closeGlobalBanner: PropTypes.func,
  isTestAccount: PropTypes.bool
};

export default CardsGroup;
