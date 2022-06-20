import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../../Common/TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import ProgressBar from '../../Common/ProgressBar';

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
  loadText: {
    color: theme.palette.text.secondary,
    padding: '5px 0 15px 0',
    fontSize: '18px'
  },
  noWrap: {
    whiteSpace: 'nowrap'
  },
  errorText: {
    fontSize: '16px',
    color: '#FF4242',
    padding: '5px 0'
  },
  [theme.breakpoints.down('xs')]: {
    form: {
      position: 'relative',
      paddingBottom: '50px'
    }
  }
}));

const validate = values => {
  const errors = {};
  if (!values.login || values.login === '') {
    errors.login = 'Field is required.';
  }
  if (!values.password || values.password === '') {
    errors.password = 'Field is required.';
  }
  // return errors;
};

function CredentialsModal(props) {
  const classes = useStyles();
  const {
    handleSubmit,
    // pristine,
    // submitting,
    endProcess,
    loadingInModal,
    errorData
  } = props;

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
          <Typography className={classes.modalTitle}>
            Please Enter your Credit Cards info
          </Typography>
          <Form onSubmit={handleSubmit} className={classes.form}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={5}>
                <Typography className={classes.label}>Login ID:</Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Field
                  name="login"
                  component={TextField}
                  variant="outlined"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography className={classes.label}>Password:</Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Field
                  name="password"
                  component={TextField}
                  variant="outlined"
                  type="password"
                  fullWidth
                />
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
                        type="submit"
                        // disabled={pristine || submitting}
                      >
                        Send
                      </Button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Typography className={classes.loadText}>
                        Submitting payment. This can take{' '}
                        <span className={classes.noWrap}>
                          up to 2 minutes ...
                        </span>
                      </Typography>
                      <ProgressBar withTimer />
                    </React.Fragment>
                  )}
                  {errorData && (
                    <Typography className={classes.errorText}>
                      {errorData}
                    </Typography>
                  )}
                </div>
              </Grid>
            </Grid>
          </Form>
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

CredentialsModal.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  classes: PropTypes.shape({}),
  loadingInModal: PropTypes.bool,
  endProcess: PropTypes.func,
  errorData: PropTypes.string
};

CredentialsModal.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  classes: undefined,
  loadingInModal: undefined,
  endProcess: undefined,
  errorData: undefined
};

export default reduxForm({
  form: 'CredentialsModal',
  validate
})(CredentialsModal);
