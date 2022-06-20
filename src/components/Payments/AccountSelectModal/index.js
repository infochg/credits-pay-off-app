import React, { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Typography,
  MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';

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
    fontWeight: '900',
    marginBottom: '20px'
  },
  modalSubTitle: {
    fontSize: '18px',
    color: theme.palette.text.secondary
  },
  label: {
    textAlign: 'left'
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
  menuWrapper: {
    position: 'relative',
    zIndex: '9000'
  },
  choosedItem: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #D4DEE8',
    boxSizing: 'border-box',
    borderRadius: '5px',
    height: '60px',
    width: '100%',
    maxWidth: '300px',
    padding: '0 10px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '300px'
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '200px'
    }
  },
  choosedItemText: {
    fontSize: '16px',
    textTransform: 'uppercase',
    fontWeight: '900',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textAlign: 'left'
  },
  arrowDown: {
    color: theme.palette.text.secondary,
    height: '6px',
    marginLeft: 'auto'
  },
  formControl: {
    margin: '0 0 0 auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 0 -10px'
    }
  },
  menuItem: {
    width: '100%',
    fontSize: '16px'
  },
  selectDropdown: {
    position: 'absolute',
    top: '56px',
    left: '0',
    background: '#fff',
    zIndex: '9000',
    width: 'calc(100% + 20px)',
    border: '1px solid #D4DEE8',
    borderTop: 'none',
    borderRadius: '0 0 5px 5px'
  },
  [theme.breakpoints.down('xs')]: {
    form: {
      position: 'relative',
      paddingBottom: '50px'
    },
    choosedItem: {
      padding: '0 10px'
    }
  }
}));

function AccountSelectModal(props) {
  const classes = useStyles();
  const { onSubmit, endProcess, loadingInModal, requiredInfo } = props;
  const [accountId, setAccountId] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (requiredInfo[0] && requiredInfo[0].account_id !== accountId) {
      setAccountId(requiredInfo[0].account_id);
    }
    // eslint-disable-next-line
  }, [requiredInfo]);

  try {
    const openMenu = () => {
      setIsMenuOpen(true);
    };

    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    const changeAccount = id => {
      setAccountId(id);
      closeMenu();
    };

    const curAccount = requiredInfo.find(item => item.account_id === accountId);

    const sendData = () => {
      onSubmit(curAccount);
    };

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
          <Typography className={classes.modalTitle}>
            Please select Account:
          </Typography>
          <div className={classes.form}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={5}>
                <Typography className={classes.label}>Account:</Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                <div className={classes.menuWrapper}>
                  <Button onClick={openMenu} className={classes.choosedItem}>
                    <Typography className={classes.choosedItemText}>
                      {curAccount
                        ? curAccount.accountName || curAccount.accountNumber
                        : 'Select Account'}
                    </Typography>
                    <Icon icon="arrow-down" className={classes.arrowDown} />
                  </Button>
                  {isMenuOpen && (
                    <div className={classes.selectDropdown}>
                      {requiredInfo.map(item => {
                        return (
                          <MenuItem
                            className={classes.menuItem}
                            onClick={() => changeAccount(item.account_id)}
                            key={item.account_id}
                          >
                            <span>
                              {item.accountName || item.accountNumber}
                            </span>
                          </MenuItem>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
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
                        type="button"
                        onClick={sendData}
                      >
                        Select
                      </Button>
                    </React.Fragment>
                  ) : (
                    <div className={classes.submitBtn}>
                      <CircularProgress />
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

AccountSelectModal.propTypes = {
  onSubmit: PropTypes.func,
  classes: PropTypes.shape({}),
  loadingInModal: PropTypes.bool,
  endProcess: PropTypes.func,
  requiredInfo: PropTypes.arrayOf(PropTypes.shape({}))
};

AccountSelectModal.defaultProps = {
  onSubmit: undefined,
  classes: undefined,
  loadingInModal: undefined,
  endProcess: undefined,
  requiredInfo: undefined
};

export default AccountSelectModal;
