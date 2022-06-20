import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Lottie from 'react-lottie';
import * as animationData from '../../../assets/animation/cards.json';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(() => ({
  preloaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100%'
  }
}));

const Preloader = props => {
  const { isCards } = props;
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  try {
    return (
      <div className={classes.preloaderWrapper}>
        {isCards ? (
          <Lottie options={defaultOptions} height={60} width={80} />
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
};

Preloader.defaultProps = {
  isCards: undefined
};

Preloader.propTypes = {
  isCards: PropTypes.bool
};

export default Preloader;
