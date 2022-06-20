import { call, put } from 'redux-saga/effects';
import cookie from 'react-cookies';
import {
  MESSAGE_ERROR,
  SEND_LOG_REQUEST,
  SHOW_2FA
} from '../actions/actionTypes';
import sagaLoading from './sagaLoading';

export default function* sagaSend2FACode() {
  try {
    yield call(sagaLoading, true);
    const resData = yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}user/2fa_send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: cookie.load('token') || ''
        }
      })
    );

    yield put({
      type: SHOW_2FA,
      payload: true
    });

    yield call(sagaLoading, false);

    const responseBody = yield resData.json();
    if (resData.status < 200 && resData.status > 300) {
      yield put({
        type: MESSAGE_ERROR,
        payload: 'There is something wrong, please try again'
      });
      yield put({
        type: SEND_LOG_REQUEST,
        data: {
          message: `API error: user/2fa_send, ${responseBody.message ||
            resData.status}`
        }
      });
    }
  } catch (error) {
    yield call(sagaLoading, false);
    yield put({
      type: MESSAGE_ERROR,
      payload: 'There is something wrong, please try again'
    });
    yield put({
      type: SEND_LOG_REQUEST,
      data: { message: `API error: user/2fa_send, ${error.message}` }
    });
  }
  return null;
}
