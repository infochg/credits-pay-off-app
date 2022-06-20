import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import ProgressBar from '../../Common/ProgressBar';

const useStyles = makeStyles(theme => ({
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
  captcha: {
    margin: '10px auto',
    '& .image_description': {
      fontSize: '22px',
      color: theme.palette.text.primary,
      fontWeight: '900',
      marginBottom: '15px'
    },
    '& ul': {
      margin: '0 auto',
      padding: '0'
    },
    '& li': {
      display: 'flex',
      justifyContent: 'center'
    },
    '& div.finovera_recaptcha_image_block': {
      position: 'relative',
      margin: '0 3px'
    },
    '& input.finovera_recaptcha_checkbox': {
      display: 'block',
      position: 'absolute',
      top: ' 0',
      left: '0',
      width: '100%',
      height: '100%',
      opacity: '0',
      margin: '-3px 0 0 0',
      '&.active': {
        opacity: '0.3'
      }
    }
  },
  [theme.breakpoints.down('xs')]: {
    form: {
      position: 'relative',
      paddingBottom: '50px'
    }
  }
}));

function ReCaptchaMFA(props) {
  const classes = useStyles();
  const { onSubmit, endProcess, loadingInModal, mfa } = props;

  const [htmlCollection, setHtmlCollection] = useState();
  const [response, setResponse] = useState({ array: [] });

  useEffect(() => {
    setHtmlCollection(
      document.getElementsByClassName('finovera_recaptcha_checkbox')
    );
  }, [mfa]);

  if (htmlCollection) {
    Object.values(htmlCollection).map(item => {
      // eslint-disable-next-line no-param-reassign
      item.onclick = e => {
        e.target.classList.add('active');
        const newArray = response.array.slice(0);
        if (newArray.indexOf(e.target.value) === -1) {
          newArray.push(e.target.value);
          setResponse({ array: newArray });
        } else {
          newArray.splice(newArray.indexOf(e.target.value), 1);
          setResponse({ array: newArray });
        }
      };
      return null;
    });
  }

  const sendResponse = () => {
    onSubmit(`{"selectedImages":"${response.array.join()}"}`);
  };

  try {
    return (
      <React.Fragment>
        <div
          className={classes.captcha}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: mfa }}
        />

        <Grid container alignItems="center">
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
                    onClick={sendResponse}
                  >
                    Send
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography className={classes.loadText}>
                    Submitting payment. This can take{' '}
                    <span className={classes.noWrap}>up to 2 minutes ...</span>
                  </Typography>
                  <ProgressBar withTimer />
                </React.Fragment>
              )}
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

ReCaptchaMFA.propTypes = {
  onSubmit: PropTypes.func,
  loadingInModal: PropTypes.bool,
  endProcess: PropTypes.func,
  mfa: PropTypes.shape({})
};

ReCaptchaMFA.defaultProps = {
  onSubmit: undefined,
  loadingInModal: undefined,
  endProcess: undefined,
  mfa: undefined
};

export default ReCaptchaMFA;
