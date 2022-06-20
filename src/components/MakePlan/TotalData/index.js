import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Scrollbar from 'react-scrollbars-custom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Tooltip, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';
import { numberWithCommas } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  scrollWrapper: {
    '& div.ScrollbarsCustom-Track': {
      background: 'transparent !important',
      borderRadius: '0 0 5px 0 !important',
      left: '0 !important',
      bottom: '-5px !important',
      width: '100% !important'
    },
    '& div.ScrollbarsCustom-Thumb': {
      height: '5px !important',
      background: '#CCE1F7 !important',
      margin: '2px 0 2px 3px !important'
    }
  },
  dataWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  card: {
    width: '100%',
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    margin: '10px',
    position: 'relative',
    transition: 'all 0.2s',
    overflow: 'visible',
    '&:first-child': {
      marginLeft: '0'
    },
    '&:last-child': {
      marginRight: '0'
    },
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },
  cardContent: {
    padding: '20px 20px !important',
    textAlign: 'center'
  },
  title: {
    fontSize: '22px',
    fontWeight: '900',
    minWidth: '130px'
  },
  principalValue: {
    color: '#60D0FE',
    fontSize: '32px',
    fontWeight: '900',
    margin: '12px auto'
  },
  debtFreeValue: {
    color: theme.palette.primary.main,
    fontSize: '32px',
    fontWeight: '900',
    margin: '12px auto'
  },
  interestPaidValue: {
    color: '#FF8C26',
    fontSize: '32px',
    fontWeight: '900',
    margin: '12px auto'
  },
  avInterestPaidValue: {
    color: theme.palette.text.secondary,
    fontSize: '32px',
    fontWeight: '900',
    margin: '12px auto 0 auto'
  },
  annualFeesValue: {
    color: '#60D0FE',
    fontSize: '32px',
    fontWeight: '900',
    margin: '12px auto'
  },
  subtext: {
    fontSize: '18px',
    lineHeight: '20px',
    color: theme.palette.text.secondary
  },
  contentScroller: {
    display: 'block !important'
  },
  infoIcon: {
    height: '15px',
    margin: '-5px 0 0 3px',
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('xs')]: {
    card: {
      marginLeft: '0',
      marginRight: '0'
    },
    dataWrapper: {
      flexDirection: 'column'
    }
  }
}));

function TotalData(props) {
  const classes = useStyles();
  const {
    data: {
      totalBalance,
      debtFreeDate,
      totalInterest,
      annualFees,
      cardsNum,
      averageInterest
    }
  } = props;

  try {
    return (
      <div className={classes.scrollWrapper}>
        <Scrollbar
          noScrollY
          translateContentSizeYToHolder
          contentProps={{
            // eslint-disable-next-line react/display-name
            renderer: data => {
              const { elementRef, ...restProps } = data;
              return (
                <div
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...restProps}
                  ref={elementRef}
                  className={classes.contentScroller}
                />
              );
            }
          }}
          style={{
            width: '100%'
          }}
        >
          <div className={classes.dataWrapper}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography
                  className={classes.title}
                  name="balanceRemainingTitle"
                >
                  Balance Remaining
                  <Tooltip
                    title="This is your total balance, across all your loans & credit cards."
                    placement="top"
                  >
                    <span>
                      <Icon icon="info" className={classes.infoIcon} />
                    </span>
                  </Tooltip>
                </Typography>
                <Typography
                  className={classes.principalValue}
                  name="balanceRemainingValue"
                >
                  {totalBalance || totalBalance === 0
                    ? numberWithCommas(totalBalance, true, 2)
                    : 'N/A'}
                </Typography>
                <Typography className={classes.subtext}>
                  from {cardsNum || 0}{' '}
                  {cardsNum === 1 ? 'card or loan' : 'cards & loans'}
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.title} name="debtFreeDateTitle">
                  Debt Free Date
                  <Tooltip
                    title="If you pay $xxx.xx per month, you'll be 100% debt free by this date."
                    placement="top"
                  >
                    <span>
                      <Icon icon="info" className={classes.infoIcon} />
                    </span>
                  </Tooltip>
                </Typography>
                <Typography
                  className={classes.debtFreeValue}
                  name="debtFreeDateValue"
                >
                  {debtFreeDate || 'N/A'}
                </Typography>
                <Typography className={classes.subtext}>
                  Debt free{' '}
                  {debtFreeDate
                    ? moment(debtFreeDate, 'MMM YYYY').fromNow()
                    : 'in N/A'}
                  !
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.title} name="interestPaidTitle">
                  Interest Paid
                  <Tooltip
                    title="This is how much interest you'll pay, by the time you pay off all your cards & loans."
                    placement="top"
                  >
                    <span>
                      <Icon icon="info" className={classes.infoIcon} />
                    </span>
                  </Tooltip>
                </Typography>
                <Typography
                  className={classes.interestPaidValue}
                  name="interestPaidValue"
                >
                  {debtFreeDate !== 'N/A'
                    ? numberWithCommas(totalInterest, true, 2) || 'N/A'
                    : `${numberWithCommas(totalInterest || 0, true)}+`}
                </Typography>
                <Typography className={classes.subtext}>
                  by {debtFreeDate || 'N/A'}
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography
                  className={classes.title}
                  name="avgInterestRateTitle"
                >
                  Avg Interest Rate
                  <Tooltip
                    title="This is the average interest rate across all your credit cards and loans."
                    placement="top"
                  >
                    <span>
                      <Icon icon="info" className={classes.infoIcon} />
                    </span>
                  </Tooltip>
                </Typography>
                <Typography
                  className={classes.avInterestPaidValue}
                  name="avgInterestRateValue"
                >
                  {averageInterest}%
                </Typography>
                <Typography className={classes.subtext}>
                  Your average interest rate
                  <br />
                  across all loans
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.title} name="annualFeePaidTitle">
                  Annual
                  <br />
                  Fees Paid
                  <Tooltip
                    title="This is how much in annual credit card fees you'll pay, based on your plan. If you pay off cards faster and close them down, you'll pay less money in annual fees."
                    placement="top"
                  >
                    <span>
                      <Icon icon="info" className={classes.infoIcon} />
                    </span>
                  </Tooltip>
                </Typography>
                <Typography
                  className={classes.annualFeesValue}
                  name="annualFeePaidValue"
                >
                  {debtFreeDate !== 'N/A' && (annualFees || annualFees === 0)
                    ? numberWithCommas(annualFees, true, 2)
                    : 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Scrollbar>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

TotalData.defaultProps = {
  data: undefined
};

TotalData.propTypes = {
  data: PropTypes.shape({
    totalBalance: PropTypes.number,
    debtFreeDate: PropTypes.string,
    totalInterest: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    annualFees: PropTypes.number,
    cardsNum: PropTypes.number,
    averageInterest: PropTypes.string
  })
};

export default TotalData;
