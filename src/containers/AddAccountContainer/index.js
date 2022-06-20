import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { usePlaidLink } from 'react-plaid-link';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { SEND_LOG_REQUEST } from '../../redux/actions/actionTypes';

function AddAccountContainer(props) {
  const {
    isAddAccountOpen,
    closeAddAccount,
    openAddMoreAccounts,
    closeAddMoreAccounts,
    sendLog
  } = props;

  // using hooks to fix redux store reloading when Plaid modal is closing
  const [successCB, setSuccessCB] = useState();
  const [exitCB, setExitCB] = useState();
  const [plaidStatus, setPlaidStatus] = useState();

  useEffect(() => {
    if (isAddAccountOpen && isAddAccountOpen.onSuccess) {
      setSuccessCB(() => isAddAccountOpen.onSuccess);
    }
    if (isAddAccountOpen && isAddAccountOpen.onExit) {
      setExitCB(() => isAddAccountOpen.onExit);
    }
  }, [isAddAccountOpen]);

  useEffect(() => {
    if (plaidStatus) {
      if (plaidStatus === 'onSuccess' && successCB) {
        successCB();
        setSuccessCB();
      }
      if (plaidStatus === 'onExit' && exitCB) {
        exitCB();
        setExitCB();
      }
    }
  }, [plaidStatus, successCB, exitCB]);

  // eslint-disable-next-line camelcase
  const onSuccess = public_token => {
    fetch(`${process.env.REACT_APP_API_URL}plaid/publicToken`, {
      method: 'POST',
      headers: {
        Authorization: cookie.load('token') || '',
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ public_token })
    });

    // console.log('public_token: ', public_token);

    if (window.ga) {
      window.ga('gtm2.send', {
        hitType: 'event',
        eventCategory: 'Connected an account to Plaid',
        eventAction: 'Connected account',
        eventLabel: 'web',
        eventValue: 0
      });
    }

    setPlaidStatus('onSuccess');
    closeAddAccount();
    if (openAddMoreAccounts) {
      openAddMoreAccounts();
    }
  };

  const onExit = (error, metadata) => {
    sendLog({
      message: `Failed plaid account connection. link_session_id: ${metadata.link_session_id}, request_id: ${metadata.request_id}`
    });
    setPlaidStatus('onExit');
    closeAddAccount();
  };

  const config = {
    clientName: '**********',
    env: 'production',
    product:
      isAddAccountOpen && isAddAccountOpen.isRegistration
        ? ['transactions', 'identity']
        : ['transactions'],
    publicKey: '************',
    onSuccess,
    onExit
  };

  const { open } = usePlaidLink(config);

  useEffect(() => {
    if (isAddAccountOpen && isAddAccountOpen.isOpen) {
      if (closeAddMoreAccounts) {
        closeAddMoreAccounts();
      }
      open();
    }
  }, [isAddAccountOpen, closeAddMoreAccounts, open]);

  return null;
}

AddAccountContainer.propTypes = {
  isAddAccountOpen: PropTypes.shape({
    isOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onExit: PropTypes.func,
    isRegistration: PropTypes.bool
  }),
  closeAddAccount: PropTypes.func,
  openAddMoreAccounts: PropTypes.func,
  closeAddMoreAccounts: PropTypes.func,
  isPhoneVerified: PropTypes.shape({}),
  sendLog: PropTypes.func
};

AddAccountContainer.defaultProps = {
  isAddAccountOpen: undefined,
  closeAddAccount: undefined,
  openAddMoreAccounts: undefined,
  closeAddMoreAccounts: undefined,
  sendLog: undefined
};

const actionsStateToProps = {
  sendLog: data => ({ type: SEND_LOG_REQUEST, data })
};

export default connect(undefined, actionsStateToProps)(AddAccountContainer);
