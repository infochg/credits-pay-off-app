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
import TextField from '../../Common/TextField';
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
  if (!values.code || values.code === '') {
    errors.code = 'Field is required.';
  }
  return errors;
};

function VerifyResetCodeModal(props) {
  const classes = useStyles();
  const { handleSubmit, pristine, submitting, loading } = props;

  try {
    return (
      <Dialog
        className={classes.modalWrapper}
        open
        BackdropProps={{
          classes: {
            root: classes.backDrop
          }
        }}
      >
        <div className={classes.modal}>
          <Typography className={classes.modalTitle}>
            Please enter Code.
          </Typography>
          <Typography className={classes.modalSubTitle}>
            We have sent you SMS with the code.
          </Typography>
          <Form onSubmit={handleSubmit}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={5}>
                <Typography className={classes.label}>
                  Six-digit code:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Field
                  name="code"
                  component={TextField}
                  variant="outlined"
                  type="text"
                  fullWidth
                />
              </Grid>
            </Grid>
            {!loading ? (
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
                disabled={pristine || submitting}
                className={classes.submitBtn}
              >
                Send Code
              </Button>
            ) : (
              <div className={classes.submitBtn}>
                <CircularProgress />
              </div>
            )}
          </Form>
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

VerifyResetCodeModal.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  loading: PropTypes.bool
};

VerifyResetCodeModal.defaultProps = {
  handleSubmit: undefined,
  pristine: undefined,
  submitting: undefined,
  loading: undefined
};

export default reduxForm({
  form: 'VerifyResetCodeModal',
  validate
})(VerifyResetCodeModal);
