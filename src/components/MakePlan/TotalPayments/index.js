import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Slider,
  Button,
  Tooltip
} from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';
import Icon from '../../Common/Icon';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '30px',
    marginBottom: '0',
    position: 'relative',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },
  cardContent: {
    padding: '20px 30px !important'
  },
  itemLine: {
    display: 'flex',
    alignItems: 'center',
    margin: '15px 0'
  },
  key: {
    fontSize: '22px',
    fontWeight: '900'
  },
  value: {
    margin: '0 0 0 auto',
    fontSize: '16px',
    color: theme.palette.text.secondary
  },
  root: {
    color: '#3880ff',
    height: 7,
    padding: '15px 0',
    position: 'relative'
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#2D47FE',
    boxShadow:
      '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
    marginTop: -12,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      '@media (hover: none)': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'
      }
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 5px)',
    top: 47,
    '& *': {
      background: '#fff',
      transform: 'none',
      padding: '0 10px',
      borderRadius: '0',
      color: theme.palette.text.primary,
      fontSize: '17px',
      height: '17px',
      fontWeight: '900'
    }
  },
  track: {
    height: 7
  },
  rail: {
    height: 5,
    opacity: 1,
    backgroundColor: theme.palette.text.disabled
  },
  mark: {
    display: 'none'
  },
  markActive: {
    display: 'none'
  },
  markLabel: {
    marginLeft: '-25px',
    top: 40,
    fontSize: '16px',
    color: theme.palette.text.secondary
  },
  title: {
    fontSize: '22px',
    fontWeight: '900',
    marginBottom: '12px'
  },
  planTypeBtn: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    fontSize: '20px',
    fontWeight: '900',
    background: theme.palette.text.disabled,
    '&:hover': {
      background: theme.palette.primary.main
    }
  },
  activeBtn: {
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.main
    }
  },
  infoIcon: {
    height: '15px',
    margin: '-5px 0 0 3px',
    color: theme.palette.text.secondary
  }
}));

function TotalPayments(props) {
  const classes = useStyles();
  const {
    changePaymentPerMonth,
    defaultMinPayment,
    paymentPerMonth,
    totalBalance
  } = props;
  const [val, setVal] = useState(0);
  const [activePlanType, setActivePlanType] = useState('recommended');

  useEffect(() => {
    if (paymentPerMonth && paymentPerMonth > 0) {
      setVal(paymentPerMonth);
    }
  }, [paymentPerMonth]);

  try {
    let maxAmount = Math.ceil((totalBalance * 0.1) / 1000) * 1000;
    if (totalBalance && maxAmount > totalBalance) {
      maxAmount = totalBalance.toFixed(2);
    }

    const marks = [
      {
        value: maxAmount,
        label: numberWithCommas(maxAmount, true, 2)
      }
    ];

    const changeValue = (event, value) => {
      changePaymentPerMonth(value);
      setVal(value);
    };

    const setMinimum = () => {
      setActivePlanType('minimum');
      changeValue(undefined, defaultMinPayment);
    };

    const setRecommended = () => {
      setActivePlanType('recommended');
      changeValue(undefined, totalBalance * 0.02);
    };

    const setAggressive = () => {
      setActivePlanType('aggressive');
      changeValue(undefined, totalBalance * 0.035);
    };

    return (
      <React.Fragment>
        <Typography className={classes.title}>Type of Payment Plan:</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="button"
              onClick={setMinimum}
              className={`${classes.planTypeBtn} ${
                activePlanType === 'minimum' ? classes.activeBtn : ''
              }`}
            >
              Just the Minimum
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="button"
              onClick={setRecommended}
              className={`${classes.planTypeBtn} ${
                activePlanType === 'recommended' ? classes.activeBtn : ''
              }`}
            >
              Recommended
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="button"
              onClick={setAggressive}
              className={`${classes.planTypeBtn} ${
                activePlanType === 'aggressive' ? classes.activeBtn : ''
              }`}
            >
              Aggressive
            </Button>
          </Grid>
        </Grid>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <div className={classes.itemLine}>
                  <Typography className={classes.key}>
                    Total Payments
                    <Tooltip
                      title="Choose your monthly payment, then see how quickly you'll get out of debt based on these payments. See how much interest you'll pay over time. Try different payment amounts to see how it affects your future."
                      placement="top"
                    >
                      <span>
                        <Icon icon="info" className={classes.infoIcon} />
                      </span>
                    </Tooltip>
                  </Typography>
                </div>
              </Grid>
            </Grid>

            {defaultMinPayment > 0 && (
              <Slider
                min={1}
                max={maxAmount}
                defaultValue={defaultMinPayment}
                marks={marks}
                value={val}
                onChange={changeValue}
                valueLabelFormat={value => numberWithCommas(value, true, 2)}
                step={1}
                valueLabelDisplay="on"
                classes={{
                  root: classes.root,
                  thumb: classes.thumb,
                  active: classes.active,
                  valueLabel: classes.valueLabel,
                  track: classes.track,
                  rail: classes.rail,
                  mark: classes.mark,
                  markActive: classes.markActive,
                  markLabel: classes.markLabel
                }}
              />
            )}
          </CardContent>
        </Card>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

TotalPayments.defaultProps = {
  changePaymentPerMonth: undefined,
  defaultMinPayment: undefined,
  paymentPerMonth: undefined,
  totalBalance: undefined
};

TotalPayments.propTypes = {
  changePaymentPerMonth: PropTypes.func,
  defaultMinPayment: PropTypes.number,
  paymentPerMonth: PropTypes.number,
  totalBalance: PropTypes.number
};

export default TotalPayments;
