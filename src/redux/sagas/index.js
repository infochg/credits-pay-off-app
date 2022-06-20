import { takeEvery } from 'redux-saga/effects';
import {
  LOGOUT_REQUEST,
  REGISTRATION_REQUEST,
  SIGNIN_REQUEST,
  VERIFY_PHONE_REQUEST,
  USER_INFO_REQUEST,
  OVERVIEW_DATA_REQUEST,
  PAYMENTS_DATA_REQUEST,
  TRANSACTIONS_DATA_REQUEST,
  SUBSCRIPTIONS_DATA_REQUEST,
  ACCOUNTS_DATA_REQUEST,
  NOTIFICATIONS_DATA_REQUEST,
  NOTIFICATIONS_CLEAR_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  VERIFY_RESET_CODE_REQUEST,
  RESET_PASSWORD_REQUEST,
  UPDATE_USER_INFO_REQUEST,
  SEND_LOG_REQUEST,
  SEND_2FA_REQUEST,
  TOGGLE_2FA_REQUEST,
  WRONG_IMAGE_REQUEST,
  ADD_EMPATHIZE_SUBSCRIPTION_REQUEST,
  CANCEL_EMPATHIZE_SUBSCRIPTION_REQUEST,
  RESET_EMPATHIZE_SUBSCRIPTION_REQUEST,
  BILLING_DATE_REQUEST
} from '../actions/actionTypes';

import sagaLogout from './sagaLogout';
import sagaRegistration from './sagaRegistration';
import sagaVerifyPhone from './sagaVerifyPhone';
import sagaSignin from './sagaSignin';
import sagaUserInfo from './sagaUserInfo';
import sagaUpdateUserInfo from './sagaUpdateUserInfo';
import sagaOverviewData from './sagaOverviewData';
import sagaPaymentsData from './sagaPaymentsData';
import sagaTransactionsData from './sagaTransactionsData';
import sagaSubscriptionsData from './sagaSubscriptionsData';
import sagaAccountsData from './sagaAccountsData';
import sagaNotificationsData from './sagaNotificationsData';
import sagaClearNotifications from './sagaClearNotifications';
import sagaChangePassword from './sagaChangePassword';
import sagaForgotPassword from './sagaForgotPassword';
import sagaVerifyResetCode from './sagaVerifyResetCode';
import sagaResetPassword from './sagaResetPassword';
import sagaSendLog from './sagaSendLog';
import sagaSend2FACode from './sagaSend2FACode';
import sagaToggle2FA from './sagaToggle2FA';
import sagaWrongImage from './sagaWrongImage';
import sagaAddEmpathizeSubscription from './sagaAddEmpathizeSubscription';
import sagaCancelEmpathizeSubscription from './sagaCancelEmpathizeSubscription';
import sagaResetEmpathizeSubscription from './sagaResetEmpathizeSubscription';
import sagaBillingDate from './sagaBillingDate';

export default function* sagas() {
  yield takeEvery(LOGOUT_REQUEST, sagaLogout);
  yield takeEvery(REGISTRATION_REQUEST, sagaRegistration);
  yield takeEvery(VERIFY_PHONE_REQUEST, sagaVerifyPhone);
  yield takeEvery(SIGNIN_REQUEST, sagaSignin);
  yield takeEvery(USER_INFO_REQUEST, sagaUserInfo);
  yield takeEvery(UPDATE_USER_INFO_REQUEST, sagaUpdateUserInfo);
  yield takeEvery(OVERVIEW_DATA_REQUEST, sagaOverviewData);
  yield takeEvery(PAYMENTS_DATA_REQUEST, sagaPaymentsData);
  yield takeEvery(TRANSACTIONS_DATA_REQUEST, sagaTransactionsData);
  yield takeEvery(SUBSCRIPTIONS_DATA_REQUEST, sagaSubscriptionsData);
  yield takeEvery(ACCOUNTS_DATA_REQUEST, sagaAccountsData);
  yield takeEvery(NOTIFICATIONS_DATA_REQUEST, sagaNotificationsData);
  yield takeEvery(NOTIFICATIONS_CLEAR_REQUEST, sagaClearNotifications);
  yield takeEvery(CHANGE_PASSWORD_REQUEST, sagaChangePassword);
  yield takeEvery(FORGOT_PASSWORD_REQUEST, sagaForgotPassword);
  yield takeEvery(VERIFY_RESET_CODE_REQUEST, sagaVerifyResetCode);
  yield takeEvery(RESET_PASSWORD_REQUEST, sagaResetPassword);
  yield takeEvery(SEND_LOG_REQUEST, sagaSendLog);
  yield takeEvery(SEND_2FA_REQUEST, sagaSend2FACode);
  yield takeEvery(TOGGLE_2FA_REQUEST, sagaToggle2FA);
  yield takeEvery(WRONG_IMAGE_REQUEST, sagaWrongImage);
  yield takeEvery(
    ADD_EMPATHIZE_SUBSCRIPTION_REQUEST,
    sagaAddEmpathizeSubscription
  );
  yield takeEvery(
    CANCEL_EMPATHIZE_SUBSCRIPTION_REQUEST,
    sagaCancelEmpathizeSubscription
  );
  yield takeEvery(
    RESET_EMPATHIZE_SUBSCRIPTION_REQUEST,
    sagaResetEmpathizeSubscription
  );
  yield takeEvery(BILLING_DATE_REQUEST, sagaBillingDate);
}
