import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Image from '../../Common/Image';
import { numberWithCommas } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    margin: '20px 0',
    padding: '15px 10px',
    border: '1px solid #D4DEE8',
    display: 'flex',
    justifyContent: 'space-between'
  },
  col: {
    padding: '0 10px'
  },
  title: {
    fontSize: '16px',
    color: theme.palette.text.secondary
  },
  value: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  saveValue: {
    color: theme.palette.primary.main,
    fontSize: '16px'
  },
  btn: {
    padding: '3px 20px',
    marginTop: '30px'
  },
  image: {
    maxWidth: '109px',
    maxHeight: '40px'
  },
  num: {
    fontSize: '18px',
    color: theme.palette.text.secondary
  },
  tabletRow: {
    display: 'none'
  },
  [theme.breakpoints.down('md')]: {
    tabletWrapper: {
      width: '100%',
      margin: '20px 0',
      padding: '15px 10px',
      border: '1px solid #D4DEE8',
      display: 'flex',
      flexDirection: 'column'
    },
    wrapper: {
      width: '100%',
      margin: '0',
      padding: '0',
      border: 'none',
      display: 'flex',
      justifyContent: 'space-between'
    },
    deskCol: {
      display: 'none'
    },
    tabletRow: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingBottom: '15px'
    },
    btn: {
      marginTop: '0'
    },
    rightCol: {
      marginLeft: 'auto'
    }
  },
  [theme.breakpoints.down('xs')]: {
    wrapper: {
      flexDirection: 'column'
    },
    tabletRow: {
      display: 'none'
    },
    deskCol: {
      display: 'block'
    },
    col: {
      display: 'flex',
      paddingBottom: '10px'
    },
    num: {
      marginLeft: 'auto'
    },
    mobCol: {
      marginLeft: 'auto',
      textAlign: 'right'
    },
    btn: {
      marginLeft: 'auto'
    }
  }
}));

function LoanItem(props) {
  const { data } = props;
  const classes = useStyles();
  try {
    return (
      <div className={classes.tabletWrapper}>
        <div className={classes.tabletRow}>
          <div className={classes.col}>
            <Image name={data.num} src={data.image} className={classes.image} />
          </div>
          <div className={classes.col}>
            <Typography className={classes.num}>{data.num}</Typography>
          </div>
          <div className={`${classes.col} ${classes.rightCol}`}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.btn}
            >
              Lender website
            </Button>
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={`${classes.col} ${classes.deskCol}`}>
            <Image name={data.num} src={data.image} className={classes.image} />
            <Typography className={classes.num}>{data.num}</Typography>
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>Interest Rate</Typography>
            <div className={classes.mobCol}>
              <Typography className={classes.value}>
                {data.interestRate && data.interestRate.val
                  ? numberWithCommas(data.interestRate.val, false, 3)
                  : 'N/A'}
                %
              </Typography>
              <Typography className={classes.saveValue}>
                Save{' '}
                {data.interestRate && data.interestRate.save
                  ? numberWithCommas(data.interestRate.save, false, 3)
                  : 'N/A'}
                %
              </Typography>
            </div>
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>Monthly Payment</Typography>
            <div className={classes.mobCol}>
              <Typography className={classes.value}>
                {data.monthlyPayment && data.monthlyPayment.val
                  ? numberWithCommas(data.monthlyPayment.val, true)
                  : 'N/A'}
              </Typography>
              <Typography className={classes.saveValue}>
                Save{' '}
                {data.monthlyPayment && data.monthlyPayment.save
                  ? numberWithCommas(data.monthlyPayment.save, true)
                  : 'N/A'}
              </Typography>
            </div>
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>Total Cost</Typography>
            <div className={classes.mobCol}>
              <Typography className={classes.value}>
                {data.totalCost && data.totalCost.val
                  ? numberWithCommas(data.totalCost.val, true)
                  : 'N/A'}
              </Typography>
              <Typography className={classes.saveValue}>
                Save{' '}
                {data.totalCost && data.totalCost.save
                  ? numberWithCommas(data.totalCost.save, true)
                  : 'N/A'}
              </Typography>
            </div>
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>Fees</Typography>
            <div className={classes.mobCol}>
              <Typography className={classes.value}>
                {data.fees ? numberWithCommas(data.fees, true) : 'N/A'}
              </Typography>
            </div>
          </div>
          <div className={`${classes.col} ${classes.deskCol}`}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.btn}
            >
              Lender website
            </Button>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

LoanItem.defaultProps = {
  data: undefined
};

LoanItem.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    num: PropTypes.string,
    interestRate: PropTypes.shape({
      val: PropTypes.number,
      save: PropTypes.number
    }),
    monthlyPayment: PropTypes.shape({
      val: PropTypes.number,
      save: PropTypes.number
    }),
    totalCost: PropTypes.shape({
      val: PropTypes.number,
      save: PropTypes.number
    }),
    fees: PropTypes.number
  })
};

export default LoanItem;
