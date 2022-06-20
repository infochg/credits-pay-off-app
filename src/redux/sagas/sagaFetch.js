import { call, put } from 'redux-saga/effects';
import cookie from 'react-cookies';
import { MESSAGE_ERROR, SEND_LOG_REQUEST } from '../actions/actionTypes';
import sagaLoading from './sagaLoading';

export default function* sagaFetch(link, method, successType, useLoader, args) {
  try {
    if (useLoader) {
      yield call(sagaLoading, true);
    }

    const resData = yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}${link}`, {
        method,
        headers: {
          Authorization: cookie.load('token') || '',
          'Content-Type':
            method !== 'get' ? 'application/json;charset=utf-8' : null
        },
        body: method !== 'get' ? JSON.stringify({ ...args }) : null
      })
    );

    if (useLoader) {
      yield call(sagaLoading, false);
    }

    const responseBody = yield resData.json();

    // for (const [key, value] of resData.headers) {
    //   console.log(`${key} = ${value}`);
    // }

    if (resData.status >= 200 && resData.status < 300) {
      yield put({ type: successType, payload: responseBody });
    } else {
      yield put({
        type: MESSAGE_ERROR,
        payload:
          responseBody.message || 'There is something wrong, please try again'
      });
      yield put({
        type: SEND_LOG_REQUEST,
        data: {
          message: `API error: ${link}, ${responseBody.message ||
            resData.status}`
        }
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    if (useLoader) {
      yield call(sagaLoading, false);
    }

    yield put({
      type: SEND_LOG_REQUEST,
      data: { message: `API error: ${link}, ${error.message}` }
    });

    yield put({
      type: MESSAGE_ERROR,
      payload: "We can't get your data from server"
    });
  }
}
