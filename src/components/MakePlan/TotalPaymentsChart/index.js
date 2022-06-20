import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardContent, Tooltip } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Chart from './Chart';
import Icon from '../../Common/Icon';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '0',
    marginBottom: '20px',
    position: 'relative',
    width: '100%',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },
  cardContent: {
    padding: '20px !important',
    width: '100%'
  },
  tabs: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    borderBottom: '2px solid #F0F4F9'
  },
  tab: {
    width: '50%',
    fontSize: '20px',
    fontWeight: '900',
    color: theme.palette.text.secondary,
    padding: '12px 20px',
    textAlign: 'center',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  activeTab: {
    background: theme.palette.text.disabled
  },
  infoIcon: {
    height: '15px',
    margin: '-5px 0 0 3px',
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('xs')]: {
    tabs: {
      flexDirection: 'column'
    },
    tab: {
      width: '100%'
    }
  }
}));

function TotalPaymentsChart(props) {
  const classes = useStyles();
  const { principalChart, interestChart } = props;
  const [curTab, setCurTab] = useState('Balance Remaining');

  const tabs = ['Balance Remaining', 'Interest Paid'];

  // Make axis static
  const [princData, setPrincData] = useState([]);
  const [latestMonth, setLatestMonth] = useState(moment());
  const [chartData, setChartData] = useState({ data: [] });

  useEffect(() => {
    if (princData.length !== principalChart.length) {
      setPrincData(principalChart);
    } else if (curTab === 'Balance Remaining') {
      setChartData({ data: principalChart || [] });
    }
  }, [princData, setPrincData, curTab, principalChart, setChartData]);

  chartData.data.map(item => {
    if (moment(item.name, 'MM/YYYY').isAfter(latestMonth)) {
      setLatestMonth(moment(item.name, 'MM/YYYY'));
    }
    return null;
  });

  useEffect(() => {
    const updatedChartData = chartData.data.slice(0);

    if (updatedChartData[updatedChartData.length - 1]) {
      while (
        latestMonth.isAfter(
          moment(updatedChartData[updatedChartData.length - 1].name, 'MM/YYYY')
        )
      ) {
        updatedChartData.push({
          ...updatedChartData[updatedChartData.length - 1],
          name: moment(
            updatedChartData[updatedChartData.length - 1].name,
            'MM/YYYY'
          )
            .add(1, 'month')
            .format('MM/YYYY')
        });
      }

      if (updatedChartData.length > chartData.data.length) {
        setChartData({ data: updatedChartData });
      }
    }
  }, [latestMonth, principalChart, chartData]);

  try {
    return (
      <Card className={classes.card}>
        <div className={classes.tabs}>
          {tabs.map(item => (
            <div
              key={item}
              className={`${classes.tab} ${
                curTab === item ? classes.activeTab : ''
              }`}
              role="presentation"
              onClick={() => setCurTab(item)}
            >
              {item}
              <Tooltip
                title={
                  item === 'Balance Remaining'
                    ? 'See how your balance on each account changes over time, based on your monthly payments. Hover the chart to see which cards to pay off first.'
                    : "See how much total interest you'll pay by the time an account is paid off. Hover over this chart to see the interest each lender is charging you."
                }
                placement="top"
              >
                <span>
                  <Icon icon="info" className={classes.infoIcon} />
                </span>
              </Tooltip>
            </div>
          ))}
        </div>
        <CardContent className={classes.cardContent}>
          <Chart
            data={
              curTab === 'Balance Remaining' ? chartData.data : interestChart
            }
          />
        </CardContent>
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

TotalPaymentsChart.defaultProps = {
  principalChart: undefined,
  interestChart: undefined
};

TotalPaymentsChart.propTypes = {
  principalChart: PropTypes.arrayOf(PropTypes.shape({})),
  interestChart: PropTypes.arrayOf(PropTypes.shape({}))
};

export default TotalPaymentsChart;
