import React from 'react';
import IcoMoon from 'react-icomoon';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const iconSet = require('../../../assets/fonts/icoMoon/selection.json');

const Icon = ({ ...props }) => {
  try {
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    return <IcoMoon iconSet={iconSet} {...props} />;
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
};

export default Icon;
