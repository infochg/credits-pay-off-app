import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import notifications from './notifications';
import loading from './loading';
import registrationError from './registrationError';
import token from './token';
import userInfo from './userInfo';
import overviewData from './overviewData';
import paymentsData from './paymentsData';
import transactionsData from './transactionsData';
import subscriptionsData from './subscriptionsData';
import notificationsData from './notificationsData';
import accountsData from './accountsData';
import isContactSent from './isContactSent';
import isResetCodeVerified from './isResetCodeVerified';
import isPasswordReset from './isPasswordReset';
import isPasswordChanged from './isPasswordChanged';
import isAddAccountOpen from './isAddAccountOpen';
import walkthrough from './walkthrough';
import is2FA from './is2FA';
import isWrongImageReqSent from './isWrongImageReqSent';
import isUserSubscribed from './isUserSubscribed';
import isUserUnsubscribed from './isUserUnsubscribed';
import billingDate from './billingDate';

const rootReducer = combineReducers({
  loading,
  notifications,
  registrationError,
  token,
  userInfo,
  overviewData,
  paymentsData,
  transactionsData,
  subscriptionsData,
  notificationsData,
  accountsData,
  isContactSent,
  isResetCodeVerified,
  isPasswordReset,
  isPasswordChanged,
  isAddAccountOpen,
  walkthrough,
  is2FA,
  isWrongImageReqSent,
  isUserSubscribed,
  isUserUnsubscribed,
  billingDate,
  form: formReducer
});

export default (state, action) =>
  rootReducer(action.type === 'RESET' ? undefined : state, action);
