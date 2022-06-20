import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../history';
import Modal from '../../components/Common/Modal';
import { LOGOUT_REQUEST } from '../../redux/actions/actionTypes';

function LogoutContainer(props) {
  const { openLogout, handleCloseLogout, logoutRequest } = props;

  const logout = () => {
    logoutRequest();
    history.push('/signin');
  };

  return (
    <Modal
      isOpened={openLogout}
      closeModal={handleCloseLogout}
      callback={logout}
      title="Do you really want logout ?"
    />
  );
}

LogoutContainer.propTypes = {
  openLogout: PropTypes.bool,
  handleCloseLogout: PropTypes.func,
  logoutRequest: PropTypes.func
};

LogoutContainer.defaultProps = {
  openLogout: undefined,
  handleCloseLogout: undefined,
  logoutRequest: undefined
};

const actionsStateToProps = {
  logoutRequest: () => ({ type: LOGOUT_REQUEST })
};

export default connect(undefined, actionsStateToProps)(LogoutContainer);
