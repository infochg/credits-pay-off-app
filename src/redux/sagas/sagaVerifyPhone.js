import { call, put } from 'redux-saga/effects';
import cookie from 'react-cookies';
import sagaLoading from './sagaLoading';

import {
  MESSAGE_ERROR,
  SEND_LOG_REQUEST,
  UPDATE_USER_INFO_REQUEST,
  VERIFY_PHONE_SUCCESS
} from '../actions/actionTypes';

export default function* sagaVerifyPhone({ data }) {
  try {
    yield call(sagaLoading, true);

    const resData = yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}user/verify`, {
        method: 'post',
        headers: {
          Authorization: cookie.load('token') || '',
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...data })
      })
    );

    yield call(sagaLoading, false);

    const responseBody = yield resData.json();

    if (resData.status >= 200 && resData.status < 300) {
      yield put({ type: VERIFY_PHONE_SUCCESS, payload: responseBody });
      yield put({
        type: UPDATE_USER_INFO_REQUEST,
        data: {
          registration: 'addingAccount'
        }
      });
    } else {
      yield put({
        type: MESSAGE_ERROR,
        payload:
          responseBody.message || 'There is something wrong, please try again'
      });
      yield put({
        type: SEND_LOG_REQUEST,
        data: {
          message: `API error: user/verify, ${responseBody.message ||
            resData.status}`
        }
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    yield call(sagaLoading, false);

    yield put({
      type: SEND_LOG_REQUEST,
      data: { message: `API error: user/verify, ${error.message}` }
    });

    yield put({
      type: MESSAGE_ERROR,
      payload: "We can't get your data from server"
    });
  }
}
