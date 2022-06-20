import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Preloader from '../Preloader';

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
  modalText: {
    color: theme.palette.text.secondary,
    padding: '20px 0 30px 0'
  },
  modalBtns: {
    paddingTop: '20px'
  },
  modalBtn: {
    width: '144px',
    padding: '6px 10px',
    margin: '10px'
  }
}));

function Modal(props) {
  const classes = useStyles();

  const {
    isOpened,
    closeModal,
    callback,
    loader,
    title,
    text,
    content,
    yesBtnText,
    noBtnText
  } = props;

  try {
    return (
      <Dialog
        className={classes.modalWrapper}
        open={isOpened}
        onClose={closeModal}
        BackdropProps={{
          classes: {
            root: classes.backDrop
          }
        }}
      >
        <div className={classes.modal}>
          {title ? (
            <Typography className={classes.modalTitle}>{title}</Typography>
          ) : null}

          {text ? (
            <Typography className={classes.modalText}>{text}</Typography>
          ) : null}

          {content}

          <div className={classes.modalBtns}>
            {!loader ? (
              <React.Fragment>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.modalBtn}
                  onClick={closeModal}
                >
                  {noBtnText || 'No'}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.modalBtn}
                  onClick={callback}
                >
                  {yesBtnText || 'Yes'}
                </Button>
              </React.Fragment>
            ) : (
              <Preloader />
            )}
          </div>
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Modal.propTypes = {
  isOpened: PropTypes.bool,
  closeModal: PropTypes.func,
  callback: PropTypes.func,
  loader: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  content: PropTypes.node,
  yesBtnText: PropTypes.string,
  noBtnText: PropTypes.string
};

Modal.defaultProps = {
  isOpened: undefined,
  closeModal: undefined,
  callback: undefined,
  loader: undefined,
  title: undefined,
  text: undefined,
  content: undefined,
  yesBtnText: undefined,
  noBtnText: undefined
};

export default Modal;
