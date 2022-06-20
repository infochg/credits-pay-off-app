import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
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
  },
  modalTitle: {
    fontSize: '22px',
    color: theme.palette.text.primary,
    fontWeight: '900'
  },
  modalBtns: {
    paddingTop: '20px',
    width: '100%',
    maxWidth: '480px'
  },
  modalBtn: {
    width: '144px',
    padding: '6px 10px',
    margin: '10px 20px'
  },
  label: {
    textAlign: 'left'
  }
}));

function ErrorModal(props) {
  const classes = useStyles();
  const { endProcess, text, tryAgain, loadingInModal } = props;

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(true);

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  try {
    return (
      <Dialog
        className={classes.modalWrapper}
        open={isErrorModalOpen}
        onClose={endProcess}
        BackdropProps={{
          classes: {
            root: classes.backDrop
          }
        }}
      >
        <div className={classes.modal}>
          <Typography className={classes.modalTitle}>{text}</Typography>
          <div className={classes.modalBtns}>
            {!loadingInModal ? (
              <React.Fragment>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.modalBtn}
                  onClick={endProcess}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.modalBtn}
                  onClick={tryAgain || closeErrorModal}
                >
                  Try again
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <CircularProgress />
              </React.Fragment>
            )}
          </div>
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

ErrorModal.propTypes = {
  endProcess: PropTypes.func,
  text: PropTypes.string,
  tryAgain: PropTypes.func,
  loadingInModal: PropTypes.bool
};

ErrorModal.defaultProps = {
  endProcess: undefined,
  text: undefined,
  tryAgain: undefined,
  loadingInModal: undefined
};

export default ErrorModal;
