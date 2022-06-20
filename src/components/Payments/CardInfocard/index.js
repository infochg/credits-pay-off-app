import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import PaymentsContainer from '../../../containers/PaymentsContainer';
import Modal from '../../Common/Modal';

import { numberWithCommas } from '../../../utils/helpers';

import disapprovedList from '../../../assets/json/disapprovedList.json';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    boxShadow: 'none',
    padding: '0',
    borderRadius: '0',
    marginTop: '-1px'
  },
  rootContent: {
    padding: '20px !important',
    border: `1px solid ${theme.palette.text.disabled}`
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  cardContent: {
    paddingTop: '10px'
  },
  cardLeftBlock: {
    whiteSpace: 'nowrap',
    paddingRight: '20px',
    minWidth: '180px',
    maxWidth: '180px'
  },
  cardRightBlock: {
    width: '100%'
  },
  imgWrapper: {
    position: 'relative',
    width: '100%',
    '& img': {
      maxWidth: '100%',
      position: 'relative'
    },
    '&:hover': {
      '& div': {
        opacity: '1'
      }
    }
  },
  wrongImgText: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    opacity: '0',
    transition: 'all .2s',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '900',
    cursor: 'pointer',
    background:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))'
  },
  cardName: {
    lineHeight: '25px',
    fontSize: '20px',
    fontWeight: '900',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  cardInfoBlocks: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardInfoBlock: {
    width: '31%',
    padding: '10px',
    background: '#F9FAFC',
    borderRadius: '5px',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardLastInfoBlock: {
    marginRight: '0',
    background: 'transparent'
  },
  cardInfoLine: {
    display: 'flex',
    color: '#a6b1bf',
    padding: '3px 0'
  },
  infoKey: {
    fontSize: '16px',
    width: '70px'
  },
  infoValue: {
    fontSize: '16px',
    whiteSpace: 'nowrap'
  },
  infoTitle: {
    color: theme.palette.text.secondary,
    fontSize: '18px',
    margin: '0 auto',
    textAlign: 'center'
  },
  infoAmount: {
    color: theme.palette.text.primary,
    fontSize: '36px',
    fontWeight: '900',
    margin: '15px auto',
    textAlign: 'center'
  },
  infoMonth: {
    fontSize: '31px'
  },
  infoText: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    margin: '0 auto',
    textAlign: 'center'
  },
  form: {
    textAlign: 'center'
  },
  btn: {
    fontSize: '18px',
    margin: '0 auto',
    padding: '3px 20px'
  },
  pendingBtn: {
    background: '#768BA2 !important',
    color: '#fff !important'
  },
  select: {
    margin: '10px 0',
    fontSize: '14px'
  },
  modalText: {
    color: theme.palette.text.secondary,
    padding: '20px 0 30px 0'
  },
  // eslint-disable-next-line no-useless-computed-key
  ['@media (max-width:1100px)']: {
    infoAmount: {
      fontSize: '28px'
    },
    infoMonth: {
      fontSize: '24px'
    },
    btn: {
      fontSize: '16px',
      margin: '0 auto',
      padding: '3px 10px'
    }
  },
  // eslint-disable-next-line no-useless-computed-key
  ['@media (max-width:750px)']: {
    cardWrapper: {
      flexDirection: 'column',
      position: 'relative'
    },
    cardLeftBlock: {
      minWidth: '1px',
      maxWidth: '100%',
      margin: '0',
      padding: '0',
      '& img': {
        width: '100%',
        maxWidth: '260px'
      }
    },
    cardInfoBlocks: {
      flexDirection: 'column'
    },
    cardInfoBlock: {
      width: '100%',
      margin: '10px auto'
    },
    btn: {
      fontSize: '18px',
      margin: '0 auto',
      padding: '3px 20px'
    }
  }
}));

const CssTextField = withStyles({
  root: {
    margin: '10px auto',
    maxWidth: '260px',
    display: 'block',
    '& .MuiOutlinedInput-input': {
      fontSize: '32px',
      textAlign: 'center',
      padding: '10px',
      // eslint-disable-next-line no-useless-computed-key
      ['@media (max-width:1050px)']: {
        fontSize: '28px'
      }
    }
  }
})(TextField);

function CardInfocard(props) {
  const {
    data,
    userId,
    sendWrongImageReport,
    isWrongImageReqSent,
    resetWrongImageReport,
    loading,
    openGlobalBanner,
    closeGlobalBanner,
    isTestAccount
  } = props;
  const [appData, setAppData] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      setAppData({ ...data });
    }
  }, [data]);

  // Wrong Image Modal
  const [openWrongImage, setOpenWrongImage] = useState(false);
  const [comment, setComment] = useState('');

  const changeComment = e => {
    setComment(e.target.value);
  };

  const handleOpenWrongImage = () => {
    setOpenWrongImage(true);
    resetWrongImageReport();
  };

  const handleCloseWrongImage = () => {
    setOpenWrongImage(false);
  };

  const report = () => {
    const reportData = {
      records: [
        {
          fields: {
            'Card Name': data.name,
            'User ID': userId,
            'Current Image': data.image,
            'Problem Description': comment
          }
        }
      ]
    };

    sendWrongImageReport(reportData);
  };

  useEffect(() => {
    if (isWrongImageReqSent) {
      handleCloseWrongImage();
    }
  }, [isWrongImageReqSent]);

  // Make payment function
  let recommendPayment = 0;

  if (appData && appData.currentBalance > 0) {
    if (appData.nextPayment) {
      recommendPayment = appData.nextPayment * 1.3;
    } else if (appData.lastPayment) {
      recommendPayment = appData.lastPayment.toFixed(2) * 1.3;
    }

    if (recommendPayment < appData.maxBalance * 0.03) {
      recommendPayment = appData.maxBalance.toFixed(2) * 0.03;
    }

    if (recommendPayment > appData.currentBalance) {
      recommendPayment = appData.currentBalance;
    }
  }

  // Change button for dissaproved Banks
  const [notPayable, setNotPayable] = useState(false);
  const [providerName, setProviderName] = useState('');

  useEffect(() => {
    if (appData && disapprovedList[appData.institution_id]) {
      setNotPayable(true);
      setProviderName(disapprovedList[appData.institution_id]);
    }
  }, [appData, setNotPayable, setProviderName]);

  // show payment process for test@empathize.com
  useEffect(() => {
    if (isTestAccount) {
      setNotPayable(true);
    }
  }, [isTestAccount, setNotPayable]);

  const redirectToWebsite = () => {
    if (appData && appData.paymentLink) {
      window.open(appData.paymentLink, '_blank');
    }
  };

  const [paymentAmount, setPaymentAmount] = useState(0);

  useEffect(() => {
    if (recommendPayment > 0) {
      setPaymentAmount(recommendPayment.toFixed(2));
    }
  }, [appData, recommendPayment, setPaymentAmount]);

  const changePaymentAmount = e => {
    setPaymentAmount(e.target.value);
  };

  // Making a payment
  const [isPaymentProcess, setIsPaymentProcess] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const startPaymentProcess = () => {
    setIsPaymentLoading(true);
    openGlobalBanner(appData.account_id || appData.name);
    setIsPaymentProcess(true);
  };

  const endPaymentProcess = () => {
    setIsPaymentProcess(false);
    closeGlobalBanner(appData.account_id || appData.name);
    setIsPaymentLoading(false);
  };

  // Testing payment
  const [MFAType, setMFAType] = useState('SINGLE_QUESTION');

  const handleChangeMFAType = event => {
    setMFAType(event.target.value);
  };

  try {
    if (appData) {
      return (
        <Card className={classes.root}>
          <CardContent className={classes.rootContent}>
            <div className={classes.cardWrapper}>
              <Typography className={classes.cardName} name="cardName">
                {appData.name}
              </Typography>
            </div>

            <div className={`${classes.cardWrapper} ${classes.cardContent}`}>
              <div className={classes.cardLeftBlock}>
                <div className={classes.imgWrapper}>
                  <img src={appData.image} alt={appData.cardName} />
                  <div
                    className={classes.wrongImgText}
                    role="presentation"
                    onClick={handleOpenWrongImage}
                  >
                    Wrong Image?
                  </div>
                </div>
                <Modal
                  isOpened={openWrongImage}
                  closeModal={handleCloseWrongImage}
                  callback={report}
                  title="Your card image is incorrect?"
                  content={
                    <React.Fragment>
                      <Typography className={classes.modalText}>
                        Please, tell us what is wrong with your card image.
                      </Typography>
                      <form noValidate autoComplete="off">
                        <TextField
                          name="comment"
                          placeholder="Add comment"
                          multiline
                          rows={1}
                          rowsMax={4}
                          fullWidth
                          variant="outlined"
                          value={comment}
                          onChange={changeComment}
                        />
                      </form>
                    </React.Fragment>
                  }
                  yesBtnText="Send"
                  noBtnText="Close"
                  loader={loading}
                />
                <div className={classes.cardInfoLine}>
                  <Typography
                    className={classes.infoKey}
                    name="cardBalanceTitle"
                  >
                    Balance
                  </Typography>
                  <Typography
                    className={classes.infoValue}
                    name="cardBalanceValue"
                  >
                    {numberWithCommas(appData.currentBalance, true, 2)}
                  </Typography>
                </div>
                <div className={classes.cardInfoLine}>
                  <Typography className={classes.infoKey} name="cardLimitTitle">
                    Limit
                  </Typography>
                  <Typography
                    className={classes.infoValue}
                    name="cardLimitValue"
                  >
                    {numberWithCommas(appData.maxBalance, true, 2)}
                  </Typography>
                </div>
                <div className={classes.cardInfoLine}>
                  <Typography className={classes.infoKey} name="cardAprTitle">
                    APR
                  </Typography>
                  <Typography className={classes.infoValue} name="cardAprValue">
                    {appData.interest && appData.interest.apr
                      ? `${appData.interest.apr}%`
                      : 'N/A'}
                  </Typography>
                </div>
              </div>
              <div
                className={`${classes.cardRightBlock} ${classes.cardInfoBlocks}`}
              >
                <div className={classes.cardInfoBlock}>
                  <Typography
                    className={classes.infoTitle}
                    name="cardRecommendedPaymentTitle"
                  >
                    Recommended Payment
                  </Typography>
                  <Typography
                    className={classes.infoAmount}
                    name="cardRecommendedPaymentValue"
                  >
                    {numberWithCommas(recommendPayment, true, 2)}
                  </Typography>
                  <Typography className={classes.infoText}>
                    <span name="cardMinimumPaymentTitle">Minimum Payment:</span>{' '}
                    <span name="cardMinimumPaymentValue">
                      {numberWithCommas(
                        appData.minimumPayment ||
                          appData.nextPayment ||
                          appData.lastPayment ||
                          0,
                        true,
                        2
                      )}
                    </span>
                  </Typography>
                </div>

                <div className={classes.cardInfoBlock}>
                  <Typography
                    className={classes.infoTitle}
                    name="cardPaymentDueTitle"
                  >
                    Payment is Due On:
                  </Typography>
                  <Typography
                    className={`${classes.infoAmount} ${classes.infoMonth}`}
                    name="cardPaymentDueValue"
                  >
                    {appData.nextPaymentDate
                      ? moment(appData.nextPaymentDate).format('MMMM D')
                      : 'N/A'}
                  </Typography>
                </div>

                <div
                  className={`${classes.cardInfoBlock} ${classes.cardLastInfoBlock}`}
                >
                  <form noValidate autoComplete="off" className={classes.form}>
                    <Typography className={classes.infoTitle}>
                      Make a Payment
                    </Typography>
                    <CssTextField
                      name="paymentAmount"
                      fullWidth
                      variant="outlined"
                      type="number"
                      value={paymentAmount}
                      onChange={changePaymentAmount}
                      disabled={!notPayable}
                    />
                    {Number(paymentAmount) === 0.555 && (
                      <Select
                        id="mfa-select"
                        value={MFAType}
                        onChange={handleChangeMFAType}
                        className={classes.select}
                      >
                        <MenuItem value="SINGLE_QUESTION">
                          Single question
                        </MenuItem>
                        <MenuItem value="DOUBLE_QUESTION">
                          Double question
                        </MenuItem>
                        <MenuItem value="OTP">One time password</MenuItem>
                        <MenuItem value="SUCCESSIVE_QUESTION">
                          Successive question
                        </MenuItem>
                        <MenuItem value="CAPTCHA">Captcha</MenuItem>
                        <MenuItem value="RECAPTCHA">ReCaptcha</MenuItem>
                      </Select>
                    )}
                    {isPaymentLoading ? (
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        className={`${classes.btn} ${classes.pendingBtn}`}
                        disabled
                      >
                        Payment Pending
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        className={`${classes.btn} ${
                          appData.paymentMade ? classes.graybtn : ''
                        }`}
                        onClick={
                          !notPayable ? redirectToWebsite : startPaymentProcess
                        }
                      >
                        {!notPayable
                          ? `Pay on ${providerName}`
                          : 'Make Payment'}
                      </Button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </CardContent>

          {isPaymentProcess ? (
            <PaymentsContainer
              paymentInfo={data}
              amount={Number(paymentAmount)}
              setIsPaymentLoading={setIsPaymentLoading}
              endPaymentProcess={endPaymentProcess}
              isTest={Number(paymentAmount) === 0.555}
              MFAType={MFAType}
            />
          ) : null}
        </Card>
      );
    }
    return null;
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

CardInfocard.propTypes = {
  data: PropTypes.shape({}),
  userId: PropTypes.number,
  sendWrongImageReport: PropTypes.func,
  isWrongImageReqSent: PropTypes.bool,
  resetWrongImageReport: PropTypes.func,
  loading: PropTypes.bool,
  isGlobalBanner: PropTypes.shape({}),
  openGlobalBanner: PropTypes.func,
  closeGlobalBanner: PropTypes.func,
  isTestAccount: PropTypes.bool
};

CardInfocard.defaultProps = {
  data: undefined,
  userId: undefined,
  sendWrongImageReport: undefined,
  isWrongImageReqSent: undefined,
  resetWrongImageReport: undefined,
  loading: undefined,
  isGlobalBanner: undefined,
  openGlobalBanner: undefined,
  closeGlobalBanner: undefined,
  isTestAccount: undefined
};

export default CardInfocard;
