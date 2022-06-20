import React from 'react';
import { Button, Dialog, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';

import completed from '../../../assets/img/completed.svg';

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
    textAlign: 'center',
    '& img': {
      maxWidth: '90%',
      margin: '0 auto 20px auto'
    }
  },
  modalTitle: {
    fontSize: '32px',
    color: theme.palette.text.primary,
    fontWeight: '900'
  },
  modalText: {
    fontSize: '22px',
    color: theme.palette.text.secondary
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

function PaymentDetailsModal(props) {
  const classes = useStyles();
  const { endProcess } = props;

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
          <img src={completed} alt="" />
          <Typography className={classes.modalTitle}>Completed!</Typography>
          <Typography className={classes.modalText}>
            Your payment successfully completed.
          </Typography>
          <div className={classes.modalBtns}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.modalBtn}
              type="button"
              onClick={endProcess}
            >
              Ok
            </Button>
          </div>
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

PaymentDetailsModal.propTypes = {
  endProcess: PropTypes.func
};

PaymentDetailsModal.defaultProps = {
  endProcess: undefined
};

export default PaymentDetailsModal;
