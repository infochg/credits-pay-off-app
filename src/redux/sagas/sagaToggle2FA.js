import { call, put } from 'redux-saga/effects';
import cookie from 'react-cookies';
import {
  MESSAGE_ERROR,
  SEND_LOG_REQUEST,
  SHOW_2FA
} from '../actions/actionTypes';
import sagaLoading from './sagaLoading';
import sagaUserInfo from './sagaUserInfo';

export default function* sagaToggle2FA(data) {
  try {
    yield call(sagaLoading, true);
    const resData = yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}user/2fa_setting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: cookie.load('token') || ''
        },
        body: JSON.stringify({ ...data.payload })
      })
    );

    yield call(sagaLoading, false);

    const responseBody = yield resData.json();
    if (resData.status >= 200 && resData.status < 300) {
      yield call(sagaUserInfo);
      yield put({
        type: SHOW_2FA,
        payload: false
      });
    } else {
      // if (/2FA is enabled/.test(responseBody.message)) {
      //   return null;
      // }

      yield put({
        type: MESSAGE_ERROR,
        payload: 'There is something wrong, please try again'
      });
      yield put({
        type: SEND_LOG_REQUEST,
        data: {
          message: `API error: user/2fa_setting, ${responseBody.message ||
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
      data: { message: `API error: user/2fa_setting, ${error.message}` }
    });
  }
  return null;
}
