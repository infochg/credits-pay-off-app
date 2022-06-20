import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../Icon';

import loading from '../../../assets/img/loading.svg';

const useStyles = makeStyles(theme => ({
  modalWrapper: {
    zIndex: '9001 !important'
  },
  backDrop: {
    backgroundColor: 'rgba(144, 144, 144, 0.98)'
  },
  modal: {
    padding: '40px',
    maxWidth: '560px',
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: '24px',
    color: theme.palette.text.primary,
    fontWeight: '900'
  },
  modalText: {
    color: theme.palette.text.secondary,
    padding: '10px 0 10px 0'
  },
  modalBtns: {
    paddingTop: '20px'
  },
  modalBtn: {
    width: '100%',
    maxWidth: '281px',
    padding: '6px 10px',
    margin: '10px'
  },
  img: {
    maxWidth: '80%',
    margin: '0 auto 30px auto'
  },
  closeIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    height: '25px',
    color: theme.palette.text.secondary,
    cursor: 'pointer'
  }
}));

function AddMoreAccountsModal(props) {
  const classes = useStyles();
  const { openAddAccount, openAddMoreAccounts } = props;

  const closeAddMoreAccounts = () => document.location.reload();

  try {
    return (
      <Dialog
        className={classes.modalWrapper}
        open={!!openAddMoreAccounts}
        onClose={closeAddMoreAccounts}
        BackdropProps={{
          classes: {
            root: classes.backDrop
          }
        }}
      >
        <div className={classes.modal}>
          <Icon
            icon="close"
            className={classes.closeIcon}
            role="presentation"
            onClick={closeAddMoreAccounts}
          />
          <img src={loading} alt="" className={classes.img} />
          <Typography className={classes.modalTitle}>
            Add another account?
          </Typography>
          <Typography className={classes.modalText}>
            Add credit cards & loans to handle all your payments in one place
          </Typography>
          <div className={classes.modalBtns}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              className={classes.modalBtn}
              onClick={openAddAccount}
            >
              + Add Credit Card or Loan
            </Button>
          </div>
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

AddMoreAccountsModal.propTypes = {
  openAddAccount: PropTypes.func,
  openAccountAdded: PropTypes.bool
};

AddMoreAccountsModal.defaultProps = {
  openAddAccount: undefined,
  openAccountAdded: undefined
};

export default AddMoreAccountsModal;
