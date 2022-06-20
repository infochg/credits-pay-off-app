import React, { useRef, useState } from 'react';
import Websocket from 'react-websocket';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import CredentialsModal from '../../components/Payments/CredentialsModal';
import AccountSelectModal from '../../components/Payments/AccountSelectModal';
import MFAModal from '../../components/Payments/MFAModal';
import PaymentDetailsModal from '../../components/Payments/PaymentDetailsModal';
import ErrorModal from '../../components/Payments/ErrorModal';

// import recaptchaData from '../../mock/recapthcha.json';

function PaymentsContainer(props) {
  const {
    paymentInfo,
    amount,
    setIsPaymentLoading,
    endPaymentProcess,
    isTest,
    MFAType
  } = props;
  const WSRef = useRef(null);
  const [messageData, setMessageData] = useState({});
  const [errorData, setErrorData] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [loadingInModal, setLoadingInModal] = useState(false);

  const endProcess = () => {
    setIsModal(false);
    endPaymentProcess();
  };

  // Credentials Modal
  const submitCredentials = values => {
    if (WSRef && WSRef.current) {
      setErrorData(null);
      setLoadingInModal(true);

      WSRef.current.sendMessage(
        JSON.stringify({
          ...messageData,
          requiredInfo: {
            type: 'password',
            credentials: [
              {
                name: 'Login ID',
                stringValue: values.login || null
              },
              {
                name: 'Password',
                stringValue: values.password || null
              }
            ]
          }
        })
      );
    }
  };

  // AccountSelect Modal
  const submitAccountSelect = values => {
    if (WSRef && WSRef.current) {
      setErrorData(null);
      setLoadingInModal(true);

      WSRef.current.sendMessage(
        JSON.stringify({
          ...messageData,
          answer: [
            {
              ...values
            }
          ]
        })
      );
    }
  };

  // SubmitMFA Modal
  const submitMFA = values => {
    if (WSRef && WSRef.current) {
      setErrorData(null);
      setLoadingInModal(true);

      if (
        isModal === 'single_question' ||
        isModal === 'otp' ||
        isModal === 'captcha'
      ) {
        WSRef.current.sendMessage(
          JSON.stringify({
            ...messageData,
            requiredInfo: { ...messageData.requiredInfo, ...values }
          })
        );
      } else if (isModal === 'double_question') {
        WSRef.current.sendMessage(
          JSON.stringify({
            ...messageData,
            requiredInfo: {
              ...messageData.requiredInfo,
              answer: {
                ...values
              }
            }
          })
        );
      } else if (isModal === 'recaptcha') {
        WSRef.current.sendMessage(
          JSON.stringify({
            ...messageData,
            requiredInfo: { ...messageData.requiredInfo, answer: values }
          })
        );
      }
    }
  };

  // WebSocket
  const handleData = data => {
    const result = JSON.parse(data);

    const testing = {
      testingBoolean: isTest
    };
    if (isTest) {
      testing.mfa = MFAType;
    }

    if (result) {
      setErrorData(null);

      if (result.startNewPayment) {
        if (WSRef && WSRef.current) {
          WSRef.current.sendMessage(
            JSON.stringify({
              startNewPayment: {
                institutionId: paymentInfo.institution_id || '',
                institutionName: paymentInfo.institution_name || '',
                accountId: paymentInfo.account_id || '',
                accountName: paymentInfo.name || '',
                paymentAmount: amount || 0
              },
              testing,
              Authorization: cookie.load('token')
            })
          );
        }
      } else if (
        result.status &&
        result.status.stage &&
        result.status.progress
      ) {
        if (result.status.stage === 'CREDENTIALS') {
          if (result.status.progress === 'WAITING_FOR_PASSWORD') {
            // sending credentials
            setIsModal('credentials');
            setMessageData(result);
          } else if (result.status.progress === 'FAILURE') {
            // error handling
            setLoadingInModal(false);
            setErrorData({
              ...result,
              errorMessage: 'Login Id or password not found, please, try again.'
            });
          } else if (result.status.progress === 'CREDENTIALS_NOT_FOUND') {
            // error handling
            setLoadingInModal(false);
            setErrorData({
              ...result,
              errorMessage: 'Login Id or password not found, please, try again.'
            });
          }
        } else if (result.status.stage === 'MULTI_FACTOR_AUTHORIZATION') {
          if (result.status.progress === 'WAITING_FOR_MFA_ANSWER') {
            // fill MFA
            setLoadingInModal(false);
            setMessageData(result);

            if (result.requiredInfo) {
              if (result.requiredInfo.type === 'SINGLE_QUESTION') {
                setIsModal('single_question');
              } else if (result.requiredInfo.type === 'DOUBLE_QUESTION') {
                setIsModal('double_question');
              } else if (result.requiredInfo.type === 'ONE_TIME_PASSWORD') {
                setIsModal('otp');
              } else if (result.requiredInfo.type === 'CAPTCHA') {
                setIsModal('captcha');
              } else if (result.requiredInfo.type === 'RECAPTCHA') {
                setIsModal('recaptcha');
              }
            }
          }
        } else if (result.status.stage === 'MULTI_FACTOR_AUTHENTICATION') {
          if (result.status.progress === 'FAILURE') {
            // error handling
            setLoadingInModal(false);
            setErrorData({
              ...result,
              errorMessage:
                'An incorrect verification code was entered. Please try again.'
            });
          } else if (
            result.status.progress === 'FAILURE_MAXIMUM_TRIES_EXCEEDED'
          ) {
            // error handling
            setLoadingInModal(false);
            setErrorData({
              ...result,
              errorMessage:
                'An incorrect verification code was entered 3 times. Please try again later.'
            });
          }
        } else if (result.status.stage === 'PAYMENT_PROCESSING_ACCOUNT') {
          if (result.status.progress === 'WAITING_FOR_ACCOUNT_SELECTION') {
            // select account from the list
            setLoadingInModal(false);
            setIsModal('accountSelect');
            setMessageData(result);
          } else if (result.status.progress === 'ACCOUNTS_NOT_FOUND') {
            // error handling
            setLoadingInModal(false);
            setErrorData({
              ...result,
              errorMessage: 'Account not found, please, try again.'
            });
          }
        } else if (result.status.stage === 'PAYMENT_PROCESSING_FIELDS') {
          if (result.status.progress === 'WAITING_FOR_PAYMENT_FIELDS') {
            // fill bank account details
            setLoadingInModal(false);
            setIsModal(null);
            setMessageData({});

            if (WSRef && WSRef.current) {
              WSRef.current.sendMessage(
                JSON.stringify({
                  ...result
                })
              );
            }
          } else if (result.status.progress === 'PAYMENT_FIELDS_NOT_FOUND') {
            // error handling
            setLoadingInModal(false);
            setErrorData({
              ...result,
              errorMessage: 'Some payments fields not found, please, try again.'
            });
          }
        } else if (result.status.stage === 'PAYMENT_DETAILS') {
          if (result.status.progress === 'PAYMENT_COMPLETED') {
            // show success modal
            setIsPaymentLoading(false);
            setLoadingInModal(false);
            setIsModal('paymentDetails');
            setMessageData({});
          } else if (result.status.progress === 'PAYMENT_NOT_COMPLETED') {
            // error handling
            setIsPaymentLoading(false);
            setLoadingInModal(false);
            setErrorData({
              ...result,
              errorMessage:
                result.info && result.info.message
                  ? result.info.message
                  : 'Payment not completed. Please try again'
            });
          }
        } else if (result.status.stage === 'PAYMENT_SUBMIT') {
          if (result.status.progress === 'PAYMENT_PENDING') {
            setIsModal('paymentPending');
          } else if (result.status.progress === 'PAYMENT_FAILED') {
            // error handling
            setIsPaymentLoading(false);
            setLoadingInModal(false);
            setErrorData({
              ...result,
              errorMessage:
                "Your payment couldn't be processed at this time. Please submit it through your bank. We're aware of the issue, and are working on getting this fixed."
            });
          }
        }
      }
    }
  };

  let isMFA = false;
  if (isModal) {
    if (
      isModal === 'single_question' ||
      isModal === 'double_question' ||
      isModal === 'otp' ||
      isModal === 'captcha' ||
      isModal === 'recaptcha'
    ) {
      isMFA = true;
    }
  }

  // function to step back in Payment flow in case of error
  const tryAgain = () => {
    setLoadingInModal(true);
    if (WSRef && WSRef.current) {
      WSRef.current.sendMessage(
        JSON.stringify({
          ...errorData
        })
      );
    }
  };

  return (
    <React.Fragment>
      <Websocket
        url="wss://staging.empathize.com/createpayment"
        ref={WSRef}
        onMessage={handleData}
        reconnect
      />

      {isModal && isModal === 'credentials' && (
        <CredentialsModal
          onSubmit={submitCredentials}
          endProcess={endProcess}
          loadingInModal={loadingInModal}
        />
      )}

      {isModal && isMFA && (
        <MFAModal
          onSubmit={submitMFA}
          mfa={messageData.requiredInfo.content || {}}
          mfaType={isModal}
          endProcess={endProcess}
          loadingInModal={loadingInModal}
        />
      )}

      {isModal && isModal === 'accountSelect' && (
        <AccountSelectModal
          onSubmit={submitAccountSelect}
          endProcess={endProcess}
          loadingInModal={loadingInModal}
          requiredInfo={
            Array.isArray(messageData.requiredInfo)
              ? messageData.requiredInfo
              : []
          }
        />
      )}

      {isModal && isModal === 'paymentDetails' && (
        <PaymentDetailsModal endProcess={endProcess} />
      )}

      {errorData && (
        <ErrorModal
          endProcess={endProcess}
          text={errorData.errorMessage}
          tryAgain={
            (isModal && isModal !== 'credentials') || !isModal ? tryAgain : null
          }
          loadingInModal={loadingInModal}
        />
      )}
    </React.Fragment>
  );
}

PaymentsContainer.propTypes = {
  paymentInfo: PropTypes.shape({
    institution_id: PropTypes.string,
    institution_name: PropTypes.string,
    account_id: PropTypes.string,
    name: PropTypes.string
  }),
  amount: PropTypes.number,
  setIsPaymentLoading: PropTypes.func,
  endPaymentProcess: PropTypes.func,
  isTest: PropTypes.bool,
  MFAType: PropTypes.string
};

PaymentsContainer.defaultProps = {
  paymentInfo: undefined,
  amount: undefined,
  setIsPaymentLoading: undefined,
  endPaymentProcess: undefined,
  isTest: undefined,
  MFAType: undefined
};

export default PaymentsContainer;
