import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Tooltip
} from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';

import money from '../../../assets/img/money.svg';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
    position: 'relative',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addressBlock: {
    // width: 'calc(50% - 50px)'
  },
  title: {
    fontSize: '24px',
    fontWeight: '900'
  },
  link: {
    color: theme.palette.primary.main,
    fontSize: '16px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  editLink: {
    marginTop: '14px',
    color: theme.palette.primary.main,
    fontSize: '16px',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  address: {
    color: theme.palette.text.secondary,
    fontSize: '18px'
  },
  iconBlock: {
    padding: '0 10px',
    textAlign: 'center'
  },
  dataBlock: {
    width: 'calc(50% - 50px)',
    display: 'flex'
  },
  infoPart: {
    width: '50%'
  },
  btnPart: {
    width: '50%',
    textAlign: 'right'
  },
  infoLine: {
    display: 'flex',
    padding: '7px 0'
  },
  infoKey: {
    fontSize: '18px',
    color: theme.palette.text.secondary,
    paddingRight: '10px'
  },
  infoValue: {
    fontSize: '18px',
    fontWeight: '900',
    marginLeft: 'auto'
  },
  green: {
    color: '#65C842'
  },
  editBtn: {
    padding: '3px 20px'
  },
  noDataText: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    '& b': {
      color: theme.palette.text.primary
    }
  },
  tablet: {
    display: 'none'
  },
  [theme.breakpoints.down('md')]: {
    cardContent: {
      paddingBottom: '0 !important',
      alignItems: 'flex-start'
    },
    tablet: {
      display: 'flex',
      paddingTop: '0 !important'
    },
    leftTab: {
      width: '50%',
      paddingRight: '40px'
    },
    rightTab: {
      width: '50%',
      marginTop: '-30px'
    },
    dataBlock: {
      width: 'calc(40% - 50px)'
    },
    infoPart: {
      display: 'none'
    },
    btnPart: {
      width: '100%',
      textAlign: 'right'
    },
    infoLine: {
      padding: '3px 0'
    }
  },
  [theme.breakpoints.down('xs')]: {
    cardContent: {
      flexDirection: 'column',
      paddingBottom: '20px !important'
    },
    dataBlock: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    infoPart: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '20px 0'
    },
    btnPart: {
      width: '100%',
      textAlign: 'center'
    },
    tablet: {
      display: 'none'
    },
    iconBlock: {
      display: 'none'
    }
  }
}));

function HomeOverview(props) {
  const { data } = props;
  const classes = useStyles();
  // eslint-disable-next-line no-console
  console.log(data);

  try {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.addressBlock}>
            <Link to="/disclosures" className={classes.link}>
              Advertiser disclosure
            </Link>
            <Typography className={classes.title}>
              Your home overview
            </Typography>
            <Typography className={classes.address}>
              2507 W White Feather LN, PHOENIX, AZ 85085
            </Typography>
            <Typography className={classes.editLink}>Edit address</Typography>
          </div>
          <div className={classes.iconBlock}>
            <img src={money} alt="" />
          </div>
          <div className={classes.dataBlock}>
            <div className={classes.infoPart}>
              <div className={classes.infoLine}>
                <div className={classes.infoKey}>
                  Zestimate{' '}
                  <Tooltip title="Information" placement="top">
                    <span>ⓘ</span>
                  </Tooltip>
                </div>
                <div className={classes.infoValue}>
                  {numberWithCommas(321739, true)}
                </div>
              </div>
              <div className={classes.infoLine}>
                <div className={classes.infoKey}>
                  30-day change{' '}
                  <Tooltip title="Information" placement="top">
                    <span>ⓘ</span>
                  </Tooltip>
                </div>
                <div className={classes.infoValue}>
                  +{numberWithCommas(3322, true)}
                </div>
              </div>
              <div className={classes.infoLine}>
                <div className={classes.infoKey}>
                  Home equity{' '}
                  <Tooltip title="Information" placement="top">
                    <span>ⓘ</span>
                  </Tooltip>
                </div>
                <div className={`${classes.infoValue} ${classes.green}`}>
                  {numberWithCommas(97094, true)}
                </div>
              </div>
            </div>
            <div className={classes.btnPart}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                className={classes.editBtn}
              >
                Edit information
              </Button>
            </div>
          </div>
        </CardContent>
        <CardContent className={classes.tablet}>
          <div className={classes.leftTab}>
            <div className={classes.infoLine}>
              <div className={classes.infoKey}>
                Home equity{' '}
                <Tooltip title="Information" placement="top">
                  <span>ⓘ</span>
                </Tooltip>
              </div>
              <div className={`${classes.infoValue} ${classes.green}`}>
                {numberWithCommas(97094, true)}
              </div>
            </div>
          </div>
          <div className={classes.rightTab}>
            <div className={classes.infoLine}>
              <div className={classes.infoKey}>
                Zestimate{' '}
                <Tooltip title="Information" placement="top">
                  <span>ⓘ</span>
                </Tooltip>
              </div>
              <div className={classes.infoValue}>
                {numberWithCommas(321739, true)}
              </div>
            </div>
            <div className={classes.infoLine}>
              <div className={classes.infoKey}>
                30-day change{' '}
                <Tooltip title="Information" placement="top">
                  <span>ⓘ</span>
                </Tooltip>
              </div>
              <div className={classes.infoValue}>
                +{numberWithCommas(3322, true)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

HomeOverview.defaultProps = {
  data: undefined
};

HomeOverview.propTypes = {
  data: PropTypes.shape({})
};

export default HomeOverview;
