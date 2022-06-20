import { call, put } from 'redux-saga/effects';
import cookie from 'react-cookies';
import sagaLoading from './sagaLoading';

import {
  ADD_EMPATHIZE_SUBSCRIPTION_SUCCESS,
  MESSAGE_ERROR,
  SEND_LOG_REQUEST,
  UPDATE_USER_INFO_REQUEST
} from '../actions/actionTypes';

export default function* sagaAddEmpathizeSubscription() {
  try {
    yield call(sagaLoading, true);

    const resData = yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}billing/addUserWithSubscription`, {
        method: 'post',
        headers: {
          Authorization: cookie.load('token') || '',
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          testMode: process.env.NODE_ENV !== 'production'
        })
      })
    );

    yield call(sagaLoading, false);

    const responseBody = yield resData.json();

    if (resData.status >= 200 && resData.status < 300) {
      yield put({
        type: ADD_EMPATHIZE_SUBSCRIPTION_SUCCESS,
        payload: responseBody
      });
      yield put({
        type: UPDATE_USER_INFO_REQUEST,
        data: {
          registration: 'addMoreAccounts'
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
          message: `API error: billing/addUserWithSubscription, ${responseBody.message ||
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
      data: {
        message: `API error: billing/addUserWithSubscription, ${error.message}`
      }
    });

    yield put({
      type: MESSAGE_ERROR,
      payload: "We can't get your data from server"
    });
  }
}
