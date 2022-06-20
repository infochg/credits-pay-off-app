import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import StyledRadio from '../../Common/StyledRadio';
import LoanItem from '../LoanItem';
import { numberWithCommas } from '../../../utils/helpers';

import loansData from '../../../mock/loansData.json';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
    position: 'relative',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },
  titleWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: '24px',
    lineHeight: '30px',
    fontWeight: '900'
  },
  lastUpdated: {
    marginLeft: 'auto',
    color: theme.palette.text.secondary,
    fontSize: '16px',
    lineHeight: '30px'
  },
  contentWrapper: {
    display: 'flex',
    width: '100%'
  },
  leftPart: {
    width: '50%',
    paddingRight: '40px'
  },
  rightPart: {
    width: '50%',
    display: 'flex'
  },
  text: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    lineHeight: '30px'
  },
  bold: {
    fontSize: '18px',
    fontWeight: '900',
    padding: '20px 0 10px 0'
  },
  link: {
    fontSize: '16px',
    color: theme.palette.primary.main,
    paddingTop: '30px',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  rightPartText: {
    width: '50%',
    paddingRight: '40px'
  },
  rightPartChart: {
    width: '50%',
    height: '250px',
    position: 'relative'
  },
  pieWrapper: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '250px',
    transform: 'rotate(-90deg) scale(1, -1)'
  },
  pieText: {
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    margin: '-35px 0 0 -75px',
    fontSize: '18px',
    color: theme.palette.text.secondary,
    width: '150px',
    '& b': {
      color: theme.palette.text.primary
    }
  },
  savingTitle: {
    fontSize: '18px',
    fontWeight: '900',
    padding: '0 0 10px 0'
  },
  savingBlock: {
    marginBottom: '30px'
  },
  savingLabel: {
    '& span': {
      fontSize: '16px'
    }
  },
  infoLine: {
    display: 'flex'
  },
  infoKey: {
    fontSize: '18px',
    color: theme.palette.text.secondary,
    paddingRight: '10px'
  },
  infoValue: {
    fontSize: '18px',
    fontWeight: '900',
    marginLeft: 'auto'
  },
  loansTitle: {
    fontSize: '18px',
    fontWeight: '900',
    padding: '20px 0 0 0'
  },
  noDataText: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    '& b': {
      color: theme.palette.text.primary
    }
  },
  [theme.breakpoints.down('md')]: {
    contentWrapper: {
      flexDirection: 'column'
    },
    leftPart: {
      width: '100%',
      paddingRight: '0'
    },
    rightPart: {
      width: '100%'
    }
  },
  [theme.breakpoints.down('xs')]: {
    titleWrapper: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    lastUpdated: {
      marginLeft: '0',
      marginBottom: '20px'
    },
    rightPart: {
      flexDirection: 'column'
    },
    rightPartText: {
      width: '100%',
      paddingRight: '0'
    },
    rightPartChart: {
      width: '100%'
    }
  }
}));

function MortgageStat(props) {
  const { data } = props;
  const classes = useStyles();
  const [saving, setSaving] = useState('monthlyPayments');

  const handleChangeSaving = event => {
    setSaving(event.target.value);
  };

  // eslint-disable-next-line no-console
  console.log(data, saving);

  try {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title}>Your mortgage</Typography>
            <Typography className={classes.lastUpdated}>
              Last updated less than a minute ago
            </Typography>
          </div>
          <div className={classes.contentWrapper}>
            <div className={classes.leftPart}>
              <Typography className={classes.text}>
                It looks like you’re paying $1,009/month.
              </Typography>
              <Typography className={classes.bold}>
                You couls save $46 on your monthly payments by refinancing with
                a 30-year loan.
              </Typography>
              <Typography className={classes.text}>
                You couls also save $13,914 on the cost of your loan based on an
                estimated 3.125% interest rate.
              </Typography>
              <div className={classes.link}>
                See how we calculate your estimated saving.
              </div>
            </div>
            <div className={classes.rightPart}>
              <div className={classes.rightPartText}>
                <Typography className={classes.savingTitle}>
                  What do need heip saving?
                </Typography>
                <FormControl
                  component="fieldset"
                  className={classes.savingBlock}
                >
                  <RadioGroup
                    aria-label="saving"
                    name="saving"
                    value={saving}
                    onChange={handleChangeSaving}
                  >
                    <FormControlLabel
                      className={classes.savingLabel}
                      value="monthlyPayments"
                      control={<StyledRadio />}
                      label="Monthly Payments"
                    />
                    <FormControlLabel
                      className={classes.savingLabel}
                      value="loan"
                      control={<StyledRadio />}
                      label="Total cost of Loan"
                    />
                  </RadioGroup>
                </FormControl>
                <div className={classes.infoLine}>
                  <Typography className={classes.infoKey}>
                    Loan amount
                  </Typography>
                  <Typography className={classes.infoValue}>
                    {numberWithCommas(225000, true)}
                  </Typography>
                </div>
                <div className={classes.infoLine}>
                  <Typography className={classes.infoKey}>Interest</Typography>
                  <Typography className={classes.infoValue}>
                    {numberWithCommas(3.49, false, 2)}%
                  </Typography>
                </div>
                <div className={classes.infoLine}>
                  <Typography className={classes.infoKey}>
                    Total interest
                  </Typography>
                  <Typography className={classes.infoValue}>
                    {numberWithCommas(138276, true)}
                  </Typography>
                </div>
                <div className={classes.infoLine}>
                  <Typography className={classes.infoKey}>
                    Total costs
                  </Typography>
                  <Typography className={classes.infoValue}>
                    {numberWithCommas(363276, true)}
                  </Typography>
                </div>
              </div>
              <div className={classes.rightPartChart}>
                <div className={classes.pieWrapper}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={[{ value: 100 }]}
                        dataKey="value"
                        innerRadius={102}
                        outerRadius={108}
                        fill="#60D0FE"
                        animationBegin={0}
                      />
                      <Pie
                        data={[{ value: 80 }]}
                        dataKey="value"
                        startAngle={0}
                        endAngle={240}
                        innerRadius={96}
                        outerRadius={114}
                        fill="#2D47FE"
                        animationBegin={0}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <Typography className={classes.pieText}>
                  You paid off <b>{numberWithCommas(355, true)}</b> of your loan
                  principal
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.loansWrapper}>
            <Typography className={classes.loansTitle}>
              30-year-fixed loans
            </Typography>
            {loansData.loansData.map(item => (
              <LoanItem key={item.id} data={item} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

MortgageStat.defaultProps = {
  data: undefined
};

MortgageStat.propTypes = {
  data: PropTypes.shape({})
};

export default MortgageStat;
