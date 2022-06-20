import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OnboardingModal from '../../components/Common/OnboardingModal';

import {
  UPDATE_USER_INFO_REQUEST,
  ADD_EMPATHIZE_SUBSCRIPTION_REQUEST,
  TOGGLE_ADD_ACCOUNT,
  RESET
} from '../../redux/actions/actionTypes';

function OnboardingContainer(props) {
  const {
    userInfo,
    updateUserInfo,
    loading,
    resetData,
    addEmpathizeSubscription,
    openAddAccount
  } = props;

  return (
    <OnboardingModal
      userInfo={userInfo}
      updateUserInfo={updateUserInfo}
      loading={loading}
      resetData={resetData}
      addEmpathizeSubscription={addEmpathizeSubscription}
      openAddAccount={openAddAccount}
    />
  );
}

OnboardingContainer.propTypes = {
  userInfo: PropTypes.shape({}),
  updateUserInfo: PropTypes.func,
  loading: PropTypes.bool,
  resetData: PropTypes.func,
  addEmpathizeSubscription: PropTypes.func,
  openAddAccount: PropTypes.func
};

OnboardingContainer.defaultProps = {
  userInfo: undefined,
  updateUserInfo: undefined,
  loading: undefined,
  resetData: undefined,
  addEmpathizeSubscription: undefined,
  openAddAccount: undefined
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  loading: state.loading
});

const actionsStateToProps = {
  updateUserInfo: data => ({ type: UPDATE_USER_INFO_REQUEST, data }),
  addEmpathizeSubscription: () => ({
    type: ADD_EMPATHIZE_SUBSCRIPTION_REQUEST
  }),
  openAddAccount: payload => ({ type: TOGGLE_ADD_ACCOUNT, payload }),
  resetData: () => ({ type: RESET })
};

export default connect(
  mapStateToProps,
  actionsStateToProps
)(OnboardingContainer);
