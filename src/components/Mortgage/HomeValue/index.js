import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Tooltip, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
    position: 'relative',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.02)'
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '40px'
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
  infoLine: {
    display: 'flex',
    maxWidth: '300px',
    padding: '5px 0'
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
  text: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    paddingTop: '20px'
  },
  noDataText: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    '& b': {
      color: theme.palette.text.primary
    }
  },
  [theme.breakpoints.down('sm')]: {
    titleWrapper: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    lastUpdated: {
      marginLeft: '0',
      marginBottom: '20px'
    },
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
  }
}));

function HomeValue(props) {
  const { data } = props;
  const classes = useStyles();
  // eslint-disable-next-line no-console
  console.log(data);

  try {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title}>Your home value</Typography>
            <Typography className={classes.lastUpdated}>
              Last updated less than a minute ago
            </Typography>
          </div>
          <div className={classes.contentWrapper}>
            <div className={classes.leftPart}>
              <div className={classes.infoLine}>
                <Typography className={classes.infoKey}>Zestimate</Typography>
                <Typography className={classes.infoValue}>
                  {numberWithCommas(321739, true)}
                </Typography>
              </div>
              <div className={classes.infoLine}>
                <Typography className={classes.infoKey}>
                  30-day change
                </Typography>
                <Typography className={classes.infoValue}>
                  +{numberWithCommas(4322, true)}{' '}
                  <Tooltip title="Information" placement="top">
                    <span>ⓘ</span>
                  </Tooltip>
                </Typography>
              </div>
              <Typography className={classes.text}>
                NerdWallet uses Zillow’s Zestimates as an appoximation of your
                home value. The most important home value is the offer you get
                when you sell your home!{' '}
                <Tooltip title="Information" placement="top">
                  <span>ⓘ</span>
                </Tooltip>
              </Typography>
            </div>
            <div className={classes.rightPart} />
          </div>
        </CardContent>
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

HomeValue.defaultProps = {
  data: undefined
};

HomeValue.propTypes = {
  data: PropTypes.shape({})
};

export default HomeValue;
