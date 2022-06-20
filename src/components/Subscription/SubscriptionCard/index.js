import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Typography, Card, CardContent, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
// import Icon from '../../Common/Icon';
import Image from '../../Common/Image';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';

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
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContent: {
    paddingTop: '10px'
  },
  cardLeftBlock: {
    paddingRight: '20px',
    width: '100%',
    maxWidth: '320px',
    display: 'inline-flex',
    alignItems: 'center',
    '& img': {
      maxWidth: '100%',
      maxHeight: '63px'
    }
  },
  cardCenterBlock: {
    display: 'inline-flex',
    justifyContent: 'space-around',
    padding: '0 15px',
    width: '100%',
    margin: '0 0 0 auto'
  },
  cardInfoBlock: {
    width: '100%',
    maxWidth: '300px'
  },
  cardTopDots: {
    margin: '0 10px 0 auto',
    color: '#a6b1bf',
    minWidth: '28px',
    maxWidth: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    borderRadius: '3px',
    transition: 'all 0.3s',
    cursor: 'pointer',
    '& svg': {
      display: 'block',
      width: '25px'
    },
    '&:hover': {
      background: '#EEF2F5'
    }
  },
  popoverContent: {
    padding: '5px 20px'
  },
  popoverItem: {
    padding: '5px 0',
    fontSize: '16px',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '& a': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
      transition: 'all 0.3s',
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  cardInfoLine: {
    display: 'flex',
    alignItems: 'center',
    color: '#a6b1bf',
    padding: '3px 0'
  },
  infoKey: {
    fontSize: '18px'
  },
  infoValue: {
    margin: '0 0 0 auto',
    color: theme.palette.text.primary,
    fontSize: '18px',
    fontWeight: '800',
    textAlign: 'right'
  },
  cardBtns: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '10px'
  },
  chipPaid: {
    fontSize: '16px',
    padding: '3px 10px',
    color: '#fff',
    backgroundColor: '#4AC036',
    margin: '0 30px 0 0'
  },
  chipUnpaid: {
    fontSize: '14px',
    padding: '3px 10px',
    color: '#fff',
    backgroundColor: '#FF4242',
    margin: '0 30px 0 0'
  },
  btn: {
    margin: '0 0 0 auto',
    padding: '3px 15px',
    whiteSpace: 'nowrap'
  },
  link: {
    textDecoration: 'none',
    margin: '0 auto'
  },
  [theme.breakpoints.down('lg')]: {
    cardLeftBlock: {
      maxWidth: '220px'
    }
  },
  [theme.breakpoints.down('md')]: {
    chipPaid: {
      fontSize: '14px',
      padding: '3px 5px'
    },
    chipUnpaid: {
      fontSize: '14px',
      padding: '3px 5px'
    },
    btn: {
      fontSize: '14px',
      padding: '3px 10px'
    }
  },
  [theme.breakpoints.down('sm')]: {
    cardLeftBlock: {
      '& img': {
        maxWidth: '100%',
        maxHeight: '43px'
      }
    }
  },
  [theme.breakpoints.down('xs')]: {
    cardWrapper: {
      flexDirection: 'column',
      position: 'relative'
    },
    cardLeftBlock: {
      minWidth: '1px',
      maxWidth: '95%',
      width: '100%',
      justifyContent: 'flex-start'
    },
    cardTopDots: {
      position: 'absolute',
      top: '0',
      right: '-10px',
      padding: '0'
    },
    cardCenterBlock: {
      width: '100%',
      padding: '20px 0'
    },
    cardRightBlock: {
      margin: '0',
      width: '100%'
    },
    cardBtns: {
      margin: '0',
      padding: '0',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    chipPaid: {
      padding: '3px 10px',
      margin: '0'
    },
    chipUnpaid: {
      padding: '3px 10px',
      margin: '0'
    },
    btn: {
      fontSize: '18px',
      padding: '3px 10px',
      whiteSpace: 'nowrap',
      margin: '15px auto 0 auto'
    }
  }
}));

function SubscriptionCard(props) {
  const { data } = props;
  const [appData, setAppData] = useState();
  // const [popoverEl, setPopoverEl] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      setAppData({ ...data });
    }
  }, [data]);

  try {
    // const openPopover = event => {
    //   setPopoverEl(event.currentTarget);
    // };
    // const closePopover = () => {
    //   setPopoverEl(null);
    // };
    // const isPopoverOpen = Boolean(popoverEl);

    if (appData) {
      return (
        <Card className={classes.root}>
          <CardContent className={classes.rootContent}>
            <div className={classes.cardWrapper}>
              <div className={classes.cardLeftBlock} name="subscriptionName">
                <Image
                  src={appData.image}
                  name={appData.name}
                  avatarsize={43}
                />
              </div>
              <div className={classes.cardCenterBlock}>
                <div className={classes.cardInfoBlock}>
                  <div className={classes.cardInfoLine}>
                    <Typography
                      className={classes.infoKey}
                      name="subscriptionPaymentTitle"
                    >
                      Payment:
                    </Typography>
                    <Typography
                      className={classes.infoValue}
                      name="subscriptionPaymentValue"
                    >
                      {numberWithCommas(appData.amount, true, 2)}
                    </Typography>
                  </div>
                  <div className={classes.cardInfoLine}>
                    <Typography
                      className={classes.infoKey}
                      name="subscriptionDebitDateTitle"
                    >
                      Debit Date:
                    </Typography>
                    <Typography
                      className={classes.infoValue}
                      name="subscriptionDebitDateValue"
                    >
                      {moment(appData.billDate).format('LL')}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={classes.cardRightBlock}>
                {/* <div
                  role="presentation"
                  className={classes.cardTopDots}
                  onClick={openPopover}
                >
                  <Icon icon="menu" />
                </div> */}

                <div className={classes.cardBtns}>
                  {appData.cancellationLink ? (
                    <a
                      href={appData.cancellationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.link}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        className={classes.btn}
                      >
                        Cancel Subscription
                      </Button>
                    </a>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      className={classes.btn}
                      disabled
                    >
                      Cancel Subscription
                    </Button>
                  )}
                </div>

                {/* <Popover
                  open={isPopoverOpen}
                  anchorEl={popoverEl}
                  onClose={closePopover}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <div className={classes.popoverContent}>
                    <Typography className={classes.popoverItem}>
                      <Link to="/">Edit</Link>
                    </Typography>
                  </div>
                </Popover> */}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return null;
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

SubscriptionCard.propTypes = {
  data: PropTypes.shape({})
};

SubscriptionCard.defaultProps = {
  data: undefined
};

export default SubscriptionCard;
