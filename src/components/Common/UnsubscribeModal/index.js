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

function UnsubscribeModal(props) {
  const classes = useStyles();
  const { handleSubmit, submitting, isOpened, closeModal, loader } = props;

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
          <Typography className={classes.modalTitle}>
            Why are you canceling your subscription?
          </Typography>
          <Form onSubmit={handleSubmit} className={classes.form}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Field
                  name="cancellationReason"
                  component={TextField}
                  variant="outlined"
                  type="text"
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.modalBtns}>
                  {!loader ? (
                    <React.Fragment>
                      <Button
                        variant="contained"
                        disableElevation
                        className={classes.modalBtn}
                        onClick={closeModal}
                      >
                        Don&lsquo;t Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        className={classes.modalBtn}
                        type="submit"
                        disabled={submitting}
                      >
                        Cancel
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

UnsubscribeModal.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  isOpened: PropTypes.bool,
  closeModal: PropTypes.func,
  loader: PropTypes.bool
};

UnsubscribeModal.defaultProps = {
  handleSubmit: undefined,
  submitting: undefined,
  isOpened: undefined,
  closeModal: undefined,
  loader: undefined
};

export default reduxForm({
  form: 'UnsubscribeModal'
})(UnsubscribeModal);
