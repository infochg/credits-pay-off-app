import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  bannerWrapper: {
    background: '#FFFFFF',
    border: '1px solid #AFBFD1',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    margin: '10px 20px 25px 20px'
  },
  leftPart: {
    padding: '20px'
  },
  rightPart: {
    minWidth: '210px',
    maxWidth: '210px',
    margin: '0 0 0 auto',
    padding: '20px',
    textAlign: 'center'
  },
  title: {
    fontSize: '26px',
    fontWeight: '900',
    color: theme.palette.text.primary
  },
  counter: {
    fontSize: '36px',
    color: '#2D47FE',
    fontWeight: '900'
  },
  text: {
    fontSize: '18px',
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('xs')]: {
    bannerWrapper: {
      flexDirection: 'column'
    },
    rightPart: {
      maxWidth: '100%',
      margin: '0 auto'
    }
  }
}));

function GlobalBanner(props) {
  const { isGlobalBanner, removeGlobalBanner } = props;
  const classes = useStyles();
  const [counter, setCounter] = useState(180);
  const [countNumber, setCountNumber] = useState(1);

  useEffect(() => {
    if (isGlobalBanner) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

      if (counter === 0) {
        if (countNumber < 6) {
          setCounter(90);
          setCountNumber(countNumber + 1);
        } else {
          removeGlobalBanner();
        }
      }

      return () => {
        clearInterval(timer);
      };
    }
    return setCounter(180);
  }, [
    counter,
    isGlobalBanner,
    removeGlobalBanner,
    countNumber,
    setCountNumber
  ]);

  try {
    const reformatCounter = number => {
      let minutes = Math.floor(number / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      let seconds = number % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes} : ${seconds}`;
    };

    return (
      <div className={classes.bannerWrapper}>
        <div className={classes.leftPart}>
          <Typography className={classes.title}>
            Please Keep This Page Open
          </Typography>
          <Typography className={classes.text}>
            We’re processing your payments, and may need additional info. You
            can submit more payments while you’re waiting.
          </Typography>
        </div>
        <div className={classes.rightPart}>
          <Typography className={classes.counter}>
            {reformatCounter(counter)}
          </Typography>
          <Typography className={classes.text}>Est Time Remaining</Typography>
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

GlobalBanner.defaultProps = {
  isGlobalBanner: undefined,
  removeGlobalBanner: undefined
};

GlobalBanner.propTypes = {
  isGlobalBanner: PropTypes.shape({}),
  removeGlobalBanner: PropTypes.func
};

export default GlobalBanner;
