import { call, put } from 'redux-saga/effects';
import sagaLoading from './sagaLoading';

import {
  MESSAGE_ERROR,
  SEND_LOG_REQUEST,
  REGISTRATION_ERROR
} from '../actions/actionTypes';

export default function* sagaRegistration({ data }) {
  try {
    yield call(sagaLoading, true);
    const resData = yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}user/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...data })
      })
    );

    const responseBody = yield resData.json();

    yield call(sagaLoading, false);
    if (resData.status >= 200 && resData.status < 300) {
      if (responseBody['Twilio Error']) {
        yield put({
          type: SEND_LOG_REQUEST,
          data: {
            message: `Twilio Error: ${responseBody['Twilio Error']}`
          }
        });
        yield put({
          type: MESSAGE_ERROR,
          payload:
            responseBody.message || 'There is something wrong, please try again'
        });
      }
    } else if (
      responseBody.status === 'failed' &&
      responseBody.message.includes('already exists')
    ) {
      yield put({
        type: REGISTRATION_ERROR,
        payload: 'You already have an account, please login'
      });
    } else {
      yield put({
        type: MESSAGE_ERROR,
        payload:
          responseBody.message || 'There is something wrong, please try again'
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    yield call(sagaLoading, false);
    yield put({
      type: SEND_LOG_REQUEST,
      data: { message: `API error user/register: ${error.message}` }
    });
    yield put({
      type: MESSAGE_ERROR,
      payload: 'There is something wrong, please try again'
    });
  }
}
