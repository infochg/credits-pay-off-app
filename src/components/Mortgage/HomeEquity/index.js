import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Tooltip, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';
import ProgressBar from '../../Common/ProgressBar';

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
    alignItems: 'flex-end',
    paddingBottom: '15px'
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
    width: '50%'
  },
  aka: {
    fontSize: '16px',
    fontWeight: '900',
    paddingBottom: '15px'
  },
  text: {
    color: theme.palette.text.secondary,
    fontSize: '16px'
  },
  infoBlock: {
    display: 'flex'
  },
  infoLine: {
    display: 'inline-flex',
    width: '50%'
  },
  padLeft: {
    paddingLeft: '40px'
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
  progress: {
    height: '30px',
    backgroundColor: '#60D0FE',
    margin: '30px 0 10px 0'
  },
  progressBar: {
    backgroundColor: '#2D47FE'
  },
  progressData: {
    position: 'relative'
  },
  curProgress: {
    position: 'absolute',
    top: '0',
    fontSize: '16px',
    fontWeight: '900',
    color: theme.palette.primary.main
  },
  totalProgress: {
    position: 'absolute',
    right: '0',
    top: '0',
    fontSize: '12px',
    color: theme.palette.text.secondary
  },
  legend: {
    float: 'right',
    display: 'flex',
    margin: '30px 0 0 0'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    marginLeft: '30px'
  },
  eqItem: {
    width: '6px',
    height: '6px',
    borderRadius: '100%',
    backgroundColor: '#2D47FE',
    marginRight: '5px'
  },
  mortItem: {
    width: '6px',
    height: '6px',
    borderRadius: '100%',
    backgroundColor: '#60D0FE',
    marginRight: '5px'
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
      width: '100%',
      paddingTop: '20px'
    }
  },
  [theme.breakpoints.down('xs')]: {
    titleWrapper: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    lastUpdated: {
      marginLeft: '0'
    },
    infoBlock: {
      width: '100%',
      flexDirection: 'column'
    },
    infoLine: {
      width: '100%'
    },
    padLeft: {
      padding: '0'
    },
    legend: {
      float: 'left'
    },
    legendItem: {
      margin: '0 20px 0 0'
    }
  }
}));

function HomeEquity(props) {
  const { data } = props;
  const classes = useStyles();
  // eslint-disable-next-line no-console
  console.log(data);

  try {
    const equity = 97079;
    const mortgage = 224645;
    const progress = (equity * 100) / mortgage;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title}>Your home equity</Typography>
            <Typography className={classes.lastUpdated}>
              Last updated less than a minute ago
            </Typography>
          </div>
          <div className={classes.contentWrapper}>
            <div className={classes.leftPart}>
              <Typography className={classes.aka}>
                a.k.a the portion of your home that’s “paid off”
              </Typography>
              <Typography className={classes.text}>
                Home equity is the value of your home minus the balance of your
                mortgage. It increases slowly with each mortgage payment, but it
                may grow faster if you make value-boosting home improvements or
                if home values rise in your area.
              </Typography>
            </div>
            <div className={classes.rightPart}>
              <div className={classes.infoBlock}>
                <div className={classes.infoLine}>
                  <Typography className={classes.infoKey}>
                    Equity{' '}
                    <Tooltip title="Information" placement="top">
                      <span>ⓘ</span>
                    </Tooltip>
                  </Typography>
                  <Typography className={classes.infoValue}>
                    {numberWithCommas(equity, true)}
                  </Typography>
                </div>
                <div className={`${classes.infoLine} ${classes.padLeft}`}>
                  <Typography className={classes.infoKey}>
                    Mortgage balance
                  </Typography>
                  <Typography className={classes.infoValue}>
                    {numberWithCommas(mortgage, true)}
                  </Typography>
                </div>
              </div>
              <ProgressBar
                classes={{
                  root: classes.progress,
                  barColorPrimary: classes.progressBar
                }}
                value={progress}
              />
              <div className={classes.progressData}>
                <div
                  className={classes.curProgress}
                  style={{ left: `${progress / 2}%` }}
                >
                  {numberWithCommas(97079, true)}
                </div>
                <div className={classes.totalProgress}>
                  {numberWithCommas(224645, true)}
                </div>
              </div>
              <div className={classes.legend}>
                <Typography className={classes.legendItem}>
                  <span className={classes.eqItem} />
                  Equity
                </Typography>
                <Typography className={classes.legendItem}>
                  <span className={classes.mortItem} />
                  Mortgage balance
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

HomeEquity.defaultProps = {
  data: undefined
};

HomeEquity.propTypes = {
  data: PropTypes.shape({})
};

export default HomeEquity;
