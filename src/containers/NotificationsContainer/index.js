import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Websocket from 'react-websocket';
import cookie from 'react-cookies';
import Notifications from '../../components/Common/Notifications';
import {
  NOTIFICATIONS_DATA_REQUEST,
  NOTIFICATIONS_CLEAR_REQUEST,
  MESSAGE_ERROR,
  MESSAGE_INFO,
  MESSAGE_SUCCESS
} from '../../redux/actions/actionTypes';

function NotificationsContainer(props) {
  const {
    fetchNotificationsData,
    clearNotifications,
    notificationsData,
    sendErrorMessage,
    sendSuccessMessage,
    sendInfoMessage
  } = props;

  // Notifications box
  useEffect(() => {
    if (!notificationsData) {
      fetchNotificationsData();
    }
  }, [notificationsData, fetchNotificationsData]);

  // Websocket info
  const WSRef = useRef(null);

  const handleData = data => {
    const result = JSON.parse(data);
    if (result.status && result.body) {
      fetchNotificationsData();
      if (result.status === 'error') {
        sendErrorMessage(result.body);
      } else if (result.status === 'success') {
        sendSuccessMessage(result.body);
      } else if (result.status === 'info') {
        sendInfoMessage(result.body);
      }
    }
  };

  const handleOpen = () => {
    if (WSRef && WSRef.current) {
      WSRef.current.sendMessage(
        JSON.stringify({ Authorization: cookie.load('token') })
      );
    }
  };

  return (
    <React.Fragment>
      <Notifications
        notificationsData={notificationsData}
        clearNotifications={clearNotifications}
      />
      <Websocket
        url="wss://staging.empathize.com/notify"
        ref={WSRef}
        onMessage={handleData}
        onOpen={handleOpen}
      />
    </React.Fragment>
  );
}

NotificationsContainer.propTypes = {
  fetchNotificationsData: PropTypes.func,
  clearNotifications: PropTypes.func,
  notificationsData: PropTypes.arrayOf(PropTypes.shape({})),
  sendErrorMessage: PropTypes.func,
  sendSuccessMessage: PropTypes.func,
  sendInfoMessage: PropTypes.func
};

NotificationsContainer.defaultProps = {
  fetchNotificationsData: undefined,
  clearNotifications: undefined,
  notificationsData: undefined,
  sendErrorMessage: undefined,
  sendSuccessMessage: undefined,
  sendInfoMessage: undefined
};

const mapStateToProps = state => ({
  notificationsData: state.notificationsData
});

const actionsStateToProps = {
  fetchNotificationsData: () => ({ type: NOTIFICATIONS_DATA_REQUEST }),
  clearNotifications: () => ({ type: NOTIFICATIONS_CLEAR_REQUEST }),
  sendErrorMessage: payload => ({ type: MESSAGE_ERROR, payload }),
  sendSuccessMessage: payload => ({ type: MESSAGE_SUCCESS, payload }),
  sendInfoMessage: payload => ({ type: MESSAGE_INFO, payload })
};

export default connect(
  mapStateToProps,
  actionsStateToProps
)(NotificationsContainer);
