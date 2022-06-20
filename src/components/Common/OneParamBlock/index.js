import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Tooltip, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../Icon';
import { numberWithCommas } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.03)'
    }
  },
  cardContent: {
    padding: '13px 16px !important'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '67px'
  },
  icon: {
    width: '100%',
    maxWidth: '40px',
    maxHeight: '40px',
    marginRight: '10px'
  },
  title: {
    fontSize: '24px',
    color: theme.palette.text.primary,
    fontWeight: '900',
    whiteSpace: 'pre-wrap'
  },
  description: {
    fontSize: '20px',
    color: theme.palette.text.secondary
  },
  amount: {
    fontSize: '22px',
    fontWeight: '900',
    margin: '0 0 0 auto',
    color: '#FF4242',
    whiteSpace: 'nowrap'
  },
  positive: {
    color: '#65C842'
  },
  arrow: {
    width: '14px',
    transform: 'rotate(270deg)',
    marginLeft: '5px',
    color: '#FF4242'
  },
  positiveArrow: {
    color: '#65C842',
    transform: 'rotate(90deg)'
  },
  infoIcon: {
    height: '15px',
    margin: '-5px 0 0 -3px',
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('sm')]: {
    amount: {
      fontSize: '16px'
    },
    title: {
      fontSize: '17px'
    },
    description: {
      fontSize: '15px'
    }
  }
}));

function OneParamBlock(props) {
  const {
    icon,
    title,
    description,
    data,
    positive,
    tooltip,
    titleName,
    valueName
  } = props;
  const classes = useStyles();

  try {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.content}>
            <Icon icon={icon} className={classes.icon} />
            <div className={classes.titleBlock}>
              <Typography className={classes.title} name={titleName}>
                {title}{' '}
                {tooltip && (
                  <Tooltip title={tooltip} placement="top">
                    <span>
                      <Icon icon="info" className={classes.infoIcon} />
                    </span>
                  </Tooltip>
                )}
              </Typography>
              <Typography className={classes.description}>
                {description}
              </Typography>
            </div>
            {data ? (
              <Typography
                className={`${classes.amount} ${
                  positive ? classes.positive : ''
                }`}
                name={valueName}
              >
                {numberWithCommas(data, true, 2)}
              </Typography>
            ) : (
              <Typography
                className={`${classes.amount} ${
                  positive ? classes.positive : ''
                }`}
                name={valueName}
              >
                {numberWithCommas(0, true, 2)}
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

OneParamBlock.defaultProps = {
  icon: undefined,
  title: undefined,
  description: undefined,
  data: undefined,
  positive: undefined,
  tooltip: undefined,
  titleName: undefined,
  valueName: undefined
};

OneParamBlock.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  positive: PropTypes.bool,
  tooltip: PropTypes.string,
  titleName: PropTypes.string,
  valueName: PropTypes.string
};

export default OneParamBlock;
