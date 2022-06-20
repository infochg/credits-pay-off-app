import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../TextField';
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
  modalSubTitle: {
    fontSize: '18px',
    color: theme.palette.text.secondary
  },
  label: {
    textAlign: 'left'
  },
  modalBtns: {
    paddingTop: '20px',
    width: '480px'
  },
  modalBtn: {
    width: '144px',
    padding: '6px 10px',
    margin: '10px 20px'
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
  if (!values.code_2fa || values.code_2fa === '') {
    errors.code_2fa = 'Field is required.';
  }
  return errors;
};

function Code2FAModal(props) {
  const classes = useStyles();
  const {
    handleSubmit,
    pristine,
    submitting,
    show2FAPreloader,
    is2FACodeVisible,
    close2FAModal,
    text
  } = props;

  try {
    return (
      <Dialog
        className={classes.modalWrapper}
        open={is2FACodeVisible}
        onClose={close2FAModal}
        BackdropProps={{
          classes: {
            root: classes.backDrop
          }
        }}
      >
        <div className={classes.modal}>
          <Typography className={classes.modalTitle}>
            {text ? `Please enter Code to ${text}` : null}
          </Typography>
          <Typography className={classes.modalSubTitle}>
            We have sent you an email with the code.
          </Typography>
          <Form onSubmit={handleSubmit} className={classes.form}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={5}>
                <Typography className={classes.label}>
                  Six-digit code:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Field
                  name="code_2fa"
                  component={TextField}
                  variant="outlined"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.modalBtns}>
                  {!show2FAPreloader ? (
                    <React.Fragment>
                      <Button
                        variant="contained"
                        disableElevation
                        className={classes.modalBtn}
                        onClick={close2FAModal}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        className={classes.modalBtn}
                        type="submit"
                        disabled={pristine || submitting}
                      >
                        Send
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
          </Form>
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Code2FAModal.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  show2FAPreloader: PropTypes.bool,
  is2FACodeVisible: PropTypes.bool,
  close2FAModal: PropTypes.func,
  text: PropTypes.string
};

Code2FAModal.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  show2FAPreloader: undefined,
  is2FACodeVisible: undefined,
  close2FAModal: undefined,
  text: undefined
};

export default reduxForm({
  form: 'Code2FAModal',
  validate
})(Code2FAModal);
