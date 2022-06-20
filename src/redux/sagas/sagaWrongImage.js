import { call, put } from 'redux-saga/effects';
import sagaLoading from './sagaLoading';
import {
  MESSAGE_ERROR,
  SEND_LOG_REQUEST,
  WRONG_IMAGE_SUCCESS
} from '../actions/actionTypes';

export default function* sagaWrongImage({ payload }) {
  try {
    yield call(sagaLoading, true);

    const resData = yield call(() =>
      fetch(
        `https://api.airtable.com/v0/appfObE3XZtAkKaHa/Wrong%20Card%20Image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer keyn4VhqjrSUBU0vS'
          },
          body: JSON.stringify({ ...payload })
        }
      )
    );

    yield call(sagaLoading, false);

    const responseBody = yield resData.json();

    if (resData.status >= 200 && resData.status < 300) {
      yield put({
        type: WRONG_IMAGE_SUCCESS,
        payload: { ...responseBody }
      });
    } else {
      yield put({
        type: MESSAGE_ERROR,
        payload: 'There is something wrong, please try again'
      });
      yield put({
        type: SEND_LOG_REQUEST,
        data: {
          message: `API error: https://api.airtable.com, ${responseBody.message ||
            resData.status}`
        }
      });
    }
  } catch (error) {
    yield call(sagaLoading, false);
    yield put({
      type: SEND_LOG_REQUEST,
      data: { message: `API error: https://api.airtable.com, ${error.message}` }
    });

    yield put({
      type: MESSAGE_ERROR,
      payload: "We can't get your data from server"
    });
  }
  return null;
}
