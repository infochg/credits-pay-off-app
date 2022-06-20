import { call, put } from 'redux-saga/effects';
import cookie from 'react-cookies';
import {
  MESSAGE_ERROR,
  NOTIFICATIONS_DATA_SUCCESS,
  SEND_LOG_REQUEST
} from '../actions/actionTypes';

export default function* sagaClearNotifications() {
  try {
    const resData = yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}notifications/clear`, {
        method: 'PATCH',
        headers: {
          Authorization: cookie.load('token') || ''
        }
      })
    );

    const responseBody = yield resData.json();

    if (resData.status >= 200 && resData.status < 300) {
      yield put({ type: NOTIFICATIONS_DATA_SUCCESS, payload: null });
    } else {
      yield put({
        type: MESSAGE_ERROR,
        payload:
          responseBody.message || 'There is something wrong, please try again'
      });
      yield put({
        type: SEND_LOG_REQUEST,
        data: {
          message: `API error: notifications/clear, ${responseBody.message ||
            resData.status}`
        }
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    yield put({
      type: SEND_LOG_REQUEST,
      data: { message: `API error: notifications/clear, ${error.message}` }
    });

    yield put({
      type: MESSAGE_ERROR,
      payload: "We can't get your data from server"
    });
  }
}
