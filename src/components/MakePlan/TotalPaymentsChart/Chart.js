import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  legend: {
    textAlign: 'right'
  },
  legendItem: {
    display: 'inline-block',
    padding: '5px 0 5px 30px',
    fontSize: '18px',
    color: theme.palette.text.primary,
    fontWeight: '900'
  },
  itemColor: {
    display: 'inline-block',
    width: '14px',
    height: '14px',
    borderRadius: '100%',
    marginRight: '10px'
  },
  pieBlock: {
    height: '300px',
    width: '100%',
    fontSize: '12px'
  },
  customTooltip: {
    background: 'rgba(255,255,255,0.5)',
    padding: '10px',
    border: `1px solid ${theme.palette.text.secondary}`
  },
  tooltipLine: {
    display: 'flex',
    width: '100%'
  },
  tooltipName: {
    margin: '0 10px 0 0'
  },
  tooltipValue: {
    margin: '0 0 0 auto'
  },
  tooltipTotal: {
    fontWeight: '900'
  },
  tooltipColor: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: '10px',
    height: '10px',
    border: `1px solid ${theme.palette.text.secondary}`,
    marginRight: '5px'
  },
  [theme.breakpoints.down('xs')]: {
    legend: {
      textAlign: 'left'
    },
    legendItem: {
      display: 'block',
      padding: '5px 0'
    }
  }
}));

const CustomTooltip = ({ active, payload }) => {
  const classes = useStyles();

  let total = 0;
  if (payload) {
    total = payload.map(item => item.value).reduce((a, b) => a + b, 0);
  }

  if (active && payload) {
    return (
      <div className={classes.customTooltip}>
        {payload.map(item => (
          <div className={classes.tooltipLine} key={item.name}>
            <div className={classes.tooltipName}>
              <span
                className={classes.tooltipColor}
                style={{ background: item.fill }}
              />
              {item.name}:
            </div>
            <div className={classes.tooltipValue}>
              {numberWithCommas(item.value, true)}
            </div>
          </div>
        ))}
        <div className={`${classes.tooltipLine} ${classes.tooltipTotal}`}>
          <div className={classes.tooltipName}>Total:</div>
          <div className={classes.tooltipValue}>
            {numberWithCommas(total, true)}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

CustomTooltip.defaultProps = {
  active: undefined,
  payload: undefined
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({}))
};

function Chart(props) {
  const classes = useStyles();
  const { data } = props;

  const colors = [
    '#CCE1F7',
    '#F0F4F9',
    '#D4DEE8',
    '#768BA2',
    '#CCE1F7',
    '#F0F4F9',
    '#D4DEE8',
    '#768BA2',
    '#CCE1F7',
    '#F0F4F9',
    '#D4DEE8',
    '#768BA2',
    '#CCE1F7',
    '#F0F4F9',
    '#D4DEE8',
    '#768BA2'
  ];

  const keys = [];
  data.map(month => {
    return Object.keys(month)
      .filter(item => item !== 'name')
      .map(item => {
        if (keys.indexOf(item) === -1) {
          keys.push(item);
        }
        return null;
      });
  });

  const cards = keys.map((item, index) => {
    return {
      name: item,
      color: colors[index]
    };
  });

  try {
    return (
      <React.Fragment>
        <div className={classes.legend}>
          {cards.map(item => (
            <div key={item.name} className={classes.legendItem}>
              <span
                className={classes.itemColor}
                style={{ background: item.color }}
              />
              {item.name}
            </div>
          ))}
        </div>
        <div className={classes.pieBlock}>
          {data && data.length > 0 ? (
            <ResponsiveContainer width="99%">
              <AreaChart
                data={data}
                margin={{
                  top: 20,
                  right: 0,
                  left: -20,
                  bottom: 0
                }}
              >
                <CartesianGrid vertical={false} stroke="#F0F4F9" />
                <XAxis dataKey="name" tickSize={0} tickMargin={10} />
                <YAxis
                  tickSize={0}
                  tickMargin={5}
                  tickFormatter={tick => {
                    if (tick > 1000) {
                      return `$${tick / 1000}k`;
                    }
                    return `$${tick}`;
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                {keys.map((item, index) => {
                  return (
                    <Area
                      key={item}
                      type="monotone"
                      dataKey={item}
                      stroke="none"
                      fill={colors[index]}
                      // fillOpacity={1}
                    />
                  );
                })}
              </AreaChart>
            </ResponsiveContainer>
          ) : null}
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Chart.defaultProps = {
  data: undefined
};

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Chart;
