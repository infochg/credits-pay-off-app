import React from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import SingleQuestionMFA from './SingleQuestionMFA';
import DoubleQuestionsMFA from './DoubleQuestionsMFA';
import OTPMFA from './OTPMFA';
import CaptchaMFA from './CaptchaMFA';
import ReCaptchaMFA from './ReCaptchaMFA';

const useStyles = makeStyles(() => ({
  modalWrapper: {
    zIndex: '9001 !important'
  },
  backDrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  modal: {
    padding: '40px',
    maxWidth: '560px',
    textAlign: 'center'
  }
}));

function MFAModal(props) {
  const classes = useStyles();
  const { onSubmit, endProcess, loadingInModal, mfa, mfaType } = props;

  try {
    return (
      <Dialog
        className={classes.modalWrapper}
        open
        onClose={endProcess}
        BackdropProps={{
          classes: {
            root: classes.backDrop
          }
        }}
      >
        <div className={classes.modal}>
          {mfaType === 'single_question' && (
            <SingleQuestionMFA
              onSubmit={onSubmit}
              mfa={mfa}
              loadingInModal={loadingInModal}
              endProcess={endProcess}
            />
          )}
          {mfaType === 'double_question' && (
            <DoubleQuestionsMFA
              onSubmit={onSubmit}
              mfa={mfa}
              loadingInModal={loadingInModal}
              endProcess={endProcess}
            />
          )}
          {mfaType === 'otp' && (
            <OTPMFA
              onSubmit={onSubmit}
              mfa={mfa}
              loadingInModal={loadingInModal}
              endProcess={endProcess}
            />
          )}
          {mfaType === 'captcha' && (
            <CaptchaMFA
              onSubmit={onSubmit}
              mfa={mfa}
              loadingInModal={loadingInModal}
              endProcess={endProcess}
            />
          )}
          {mfaType === 'recaptcha' && (
            <ReCaptchaMFA
              onSubmit={onSubmit}
              mfa={mfa}
              loadingInModal={loadingInModal}
              endProcess={endProcess}
            />
          )}
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

MFAModal.propTypes = {
  onSubmit: PropTypes.func,
  classes: PropTypes.shape({}),
  loadingInModal: PropTypes.bool,
  endProcess: PropTypes.func,
  mfa: PropTypes.shape({}),
  mfaType: PropTypes.string
};

MFAModal.defaultProps = {
  onSubmit: undefined,
  classes: undefined,
  loadingInModal: undefined,
  endProcess: undefined,
  mfa: undefined,
  mfaType: undefined
};

export default MFAModal;
