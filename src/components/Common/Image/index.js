import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(() => ({
  avatar: {
    float: 'left'
  },
  shortName: {
    float: 'left',
    fontSize: '18px',
    fontWeight: '900',
    maxWidth: '120px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  name: {
    float: 'left',
    fontSize: '18px',
    fontWeight: '900'
  }
}));

const Img = props => {
  const { name, src, isShort } = props;
  const [isError, setIsError] = useState(false);
  const classes = useStyles();

  const handleError = () => setIsError(true);

  useEffect(() => {
    const img = document.createElement('img');
    img.src = src;
    img.addEventListener('error', handleError);
    return () => img.removeEventListener('error', handleError);
  }, [src, setIsError]);

  try {
    return !isError && src !== null ? (
      <Tooltip title={name}>
        <img src={src} alt={name} />
      </Tooltip>
    ) : (
      <Tooltip title={name}>
        <Typography className={isShort ? classes.shortName : classes.name}>
          {name}
        </Typography>
      </Tooltip>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
};

Img.defaultProps = {
  name: undefined,
  src: undefined,
  isShort: undefined
};

Img.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  isShort: PropTypes.bool
};

export default Img;
