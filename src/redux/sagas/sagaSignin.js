import { call, put } from 'redux-saga/effects';
import sagaLoading from './sagaLoading';
import sagaUserInfo from './sagaUserInfo';
import {
  MESSAGE_ERROR,
  SEND_LOG_REQUEST,
  SIGNIN_SUCCESS,
  SHOW_2FA
} from '../actions/actionTypes';

export default function* sagaSignin({ data }) {
  try {
    yield call(sagaLoading, true);
    const resData = yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...data })
      })
    );

    yield call(sagaLoading, false);

    const responseBody = yield resData.json();
    if (resData.status >= 200 && resData.status < 300) {
      yield put({
        type: SIGNIN_SUCCESS,
        payload: { data: responseBody }
      });
      yield put({
        type: SHOW_2FA,
        payload: false
      });
      yield call(sagaUserInfo);
    } else {
      if (/2FA is enabled/.test(responseBody.message)) {
        yield put({
          type: SHOW_2FA,
          payload: true
        });
        return null;
      }

      if (
        /User with such email and password was not found/.test(
          responseBody.message
        )
      ) {
        yield put({
          type: MESSAGE_ERROR,
          payload:
            'The password you entered is incorrect, please try again later'
        });
        yield put({
          type: SEND_LOG_REQUEST,
          data: {
            message: `${data.email}, ${responseBody.message || resData.status}`
          }
        });
        return null;
      }

      yield put({
        type: MESSAGE_ERROR,
        payload:
          responseBody.message || 'There is something wrong, please try again'
      });
      yield put({
        type: SEND_LOG_REQUEST,
        data: {
          message: `API error: user/login, 
          ${data.email}, 
          ${responseBody.message || resData.status}`
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
      data: {
        message: `API error: user/login, ${data.email}, ${error.message}`
      }
    });
  }
  return null;
}
