import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Card, CardContent, Tooltip, Typography } from '@material-ui/core';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';
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
    whiteSpace: 'nowrap'
  },
  balanceChart: {
    fontSize: '12px',
    color: theme.palette.text.secondary
  },
  balanceValue: {
    margin: '0 0 0 auto',
    fontSize: '20px',
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
  },
  link: {
    display: 'inline-block',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    borderBottom: '1px solid transparent',
    transition: 'all 0.2s',
    fontWeight: '900',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.primary.main}`
    }
  },
  infoIcon: {
    height: '15px',
    margin: '-5px 0 0 3px',
    color: theme.palette.text.secondary
  }
}));

function BalanceChart(props) {
  const { data, toggleAddAccountModal } = props;
  const classes = useStyles();

  try {
    let balanceChartData = [];

    if (data) {
      if (data.dailyBalance) {
        data.dailyBalance.map(item => {
          if (Object.values(item)[0] && Object.keys(item)[0]) {
            balanceChartData.push({
              x: moment(Object.keys(item)[0]).format('MMM'),
              y: Object.values(item)[0],
              date: moment(Object.keys(item)[0])
            });
          }
          return null;
        });
      } else if (Object.keys(data).length > 0) {
        Object.keys(data).map(item => {
          if (item && data[item]) {
            balanceChartData.push({
              x: moment(item).format('MMM'),
              y: data[item],
              date: moment(item)
            });
          }
          return null;
        });
      }
    }

    balanceChartData = balanceChartData.sort(
      (a, b) =>
        moment(new Date(a.date)).format('YYYYMMDD') -
        moment(new Date(b.date)).format('YYYYMMDD')
    );

    return (
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} name="totalDebtTitle">
              Total Debt
              <Tooltip
                title="This shows your combined debt, across all your accounts, graphed over time."
                placement="top"
              >
                <span>
                  <Icon icon="info" className={classes.infoIcon} />
                </span>
              </Tooltip>
            </Typography>
            <Typography className={classes.balanceValue} name="totalDebtValue">
              {balanceChartData.length > 0
                ? numberWithCommas(
                    balanceChartData[balanceChartData.length - 1].y,
                    true,
                    2
                  )
                : ''}
            </Typography>
          </div>
          {balanceChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={115}>
              <LineChart
                data={balanceChartData}
                className={classes.balanceChart}
                margin={{
                  top: 10,
                  right: 0,
                  left: -25,
                  bottom: -10
                }}
              >
                <CartesianGrid vertical={false} />
                <Line
                  type="linear"
                  dataKey="y"
                  stroke="#006AD8"
                  strokeWidth={2}
                  dot={false}
                />
                <XAxis dataKey="x" interval={30} />
                <YAxis
                  dataKey="y"
                  tickFormatter={value => {
                    if (value < 1000) {
                      return `$${value}`;
                    }
                    return `${value / 1000}k`;
                  }}
                  tickSize={0}
                  tickMargin={5}
                  interval={0}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography className={classes.noDataText}>
              <img src={noData} alt="" />
              <span>
                <span
                  role="presentation"
                  onClick={() =>
                    toggleAddAccountModal({
                      isOpen: true
                    })
                  }
                  className={classes.link}
                >
                  Connect accounts
                </span>{' '}
                to get data
              </span>
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

BalanceChart.defaultProps = {
  data: undefined,
  toggleAddAccountModal: undefined
};

BalanceChart.propTypes = {
  data: PropTypes.shape({
    dailyBalance: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  toggleAddAccountModal: PropTypes.func
};

export default BalanceChart;
