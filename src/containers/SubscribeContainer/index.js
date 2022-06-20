import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubscribeModal from '../../components/Common/SubscribeModal';

import {
  ADD_EMPATHIZE_SUBSCRIPTION_REQUEST,
  RESET_EMPATHIZE_SUBSCRIPTION_REQUEST,
  RESET
} from '../../redux/actions/actionTypes';

function SubscribeContainer(props) {
  const {
    loading,
    addEmpathizeSubscription,
    resetEmpathizeSubscription,
    isUserSubscribed,
    resetData,
    userInfo
  } = props;

  useEffect(() => {
    if (isUserSubscribed) {
      resetData();
    }
  }, [isUserSubscribed, resetData]);

  return (
    <SubscribeModal
      loading={loading}
      addEmpathizeSubscription={addEmpathizeSubscription}
      resetEmpathizeSubscription={resetEmpathizeSubscription}
      isRegistration={
        userInfo.registration !== null && userInfo.registration !== 'done'
      }
    />
  );
}

SubscribeContainer.propTypes = {
  loading: PropTypes.bool,
  addEmpathizeSubscription: PropTypes.func,
  resetEmpathizeSubscription: PropTypes.func,
  isUserSubscribed: PropTypes.bool,
  resetData: PropTypes.func,
  userInfo: PropTypes.shape({
    registration: PropTypes.string,
    email: PropTypes.string
  })
};

SubscribeContainer.defaultProps = {
  loading: undefined,
  addEmpathizeSubscription: undefined,
  resetEmpathizeSubscription: undefined,
  isUserSubscribed: undefined,
  resetData: undefined,
  userInfo: undefined
};

const mapStateToProps = state => ({
  loading: state.loading,
  isUserSubscribed: state.isUserSubscribed,
  userInfo: state.userInfo
});

const actionsStateToProps = {
  addEmpathizeSubscription: () => ({
    type: ADD_EMPATHIZE_SUBSCRIPTION_REQUEST
  }),
  resetEmpathizeSubscription: () => ({
    type: RESET_EMPATHIZE_SUBSCRIPTION_REQUEST
  }),
  resetData: () => ({ type: RESET })
};

export default connect(
  mapStateToProps,
  actionsStateToProps
)(SubscribeContainer);
