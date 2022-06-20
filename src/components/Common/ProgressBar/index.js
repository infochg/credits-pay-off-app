import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const ProgressBar = props => {
  const { classes, value, withTimer } = props;
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0.08);

  useEffect(() => {
    let timer;

    if (withTimer) {
      timer = setInterval(() => {
        setProgress(prevProgress =>
          prevProgress >= 100 ? 0.08 : prevProgress + 0.08
        );
      }, 100);
    } else {
      timer = setInterval(() => {
        setCompleted(oldCompleted => {
          const diff = Math.random() * 10;
          return Math.min(oldCompleted + diff, value);
        });
      }, 50);
    }

    return () => {
      clearInterval(timer);
    };
  }, [value, withTimer]);

  try {
    return (
      <LinearProgress
        variant="determinate"
        value={withTimer ? progress : completed}
        classes={{ ...classes }}
      />
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
};

ProgressBar.defaultProps = {
  classes: undefined,
  value: undefined,
  withTimer: undefined
};

ProgressBar.propTypes = {
  classes: PropTypes.shape({}),
  value: PropTypes.number,
  withTimer: PropTypes.bool
};

export default ProgressBar;
