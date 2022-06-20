import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SEND_LOG_REQUEST } from '../../redux/actions/actionTypes';

const ErrorBoundary = ({ error, sendLog }) => {
  // eslint-disable-next-line no-console
  console.log(error);
  sendLog({ message: error.stack });
  return <h4>Oops!!! Something went wrong</h4>;
};

ErrorBoundary.defaultProps = {
  error: undefined,
  sendLog: undefined
};

ErrorBoundary.propTypes = {
  error: PropTypes.shape({
    stack: PropTypes.string
  }),
  sendLog: PropTypes.func
};

const actionsStateToProps = {
  sendLog: data => ({ type: SEND_LOG_REQUEST, data })
};

export default connect(undefined, actionsStateToProps)(ErrorBoundary);
