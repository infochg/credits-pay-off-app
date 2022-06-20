import React, { useImperativeHandle, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Tooltip } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';
import { numberWithCommas } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none'
  },
  card: {
    boxShadow: '0px 4px 28px rgba(119, 140, 162, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
    position: 'relative',
    cursor: 'grab',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.01)'
    }
  },
  cardContent: {
    padding: '20px 30px !important'
  },
  name: {
    fontSize: '20px',
    fontWeight: '900',
    marginBottom: '10px'
  },
  dataWrapper: {
    display: 'flex',
    width: '100%'
  },
  image: {
    '& img': {
      maxWidth: '130px'
    }
  },
  dataItem: {
    flex: 1,
    textAlign: 'center'
  },
  dataTitle: {
    fontSize: '16px',
    color: '#768BA2'
  },
  dataValue: {
    fontSize: '24px',
    fontWeight: '900'
  },
  grayText: {
    color: theme.palette.text.secondary
  },
  infoIcon: {
    height: '15px',
    marginTop: '-3px'
  },
  [theme.breakpoints.down('xs')]: {
    image: {
      display: 'none'
    },
    dataWrapper: {
      flexDirection: 'column'
    },
    dataItem: {
      display: 'flex',
      flexDirection: 'row',
      textAlign: 'left',
      alignItems: 'center'
    },
    dataTitle: {
      fontSize: '18px'
    },
    dataValue: {
      fontSize: '18px',
      margin: '0 0 0 auto',
      textAlign: 'right'
    }
  }
}));

const CardItem = React.forwardRef(
  ({ data, connectDragSource, connectDropTarget }, ref) => {
    const classes = useStyles();

    try {
      const elementRef = useRef(null);
      connectDragSource(elementRef);
      connectDropTarget(elementRef);
      useImperativeHandle(ref, () => ({
        getNode: () => elementRef.current
      }));

      return (
        <div ref={elementRef}>
          <Link to="/payments" className={classes.link}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.name} name="cardName">
                  {data.name}
                </Typography>
                <div className={classes.dataWrapper}>
                  <div className={classes.image}>
                    <img src={data.image} alt={data.name} />
                  </div>
                  <div className={classes.dataItem}>
                    <Typography
                      className={classes.dataTitle}
                      name="cardBalanceTitle"
                    >
                      Balance
                    </Typography>
                    <Typography
                      className={classes.dataValue}
                      name="cardBalanceValue"
                    >
                      {numberWithCommas(data.balance, true, 2)}
                    </Typography>
                  </div>
                  <div className={classes.dataItem}>
                    <Typography
                      className={classes.dataTitle}
                      name="cardPayOffDateTitle"
                    >
                      Pay off date
                    </Typography>
                    <Typography
                      className={classes.dataValue}
                      name="cardPayOffDateValue"
                    >
                      {data.payOffDate}
                    </Typography>
                  </div>
                  <div className={classes.dataItem}>
                    <Typography
                      className={classes.dataTitle}
                      name="cardInterestRateTitle"
                    >
                      Interest rate
                    </Typography>
                    <Typography
                      className={`${classes.dataValue} ${
                        typeof data.interest !== 'number'
                          ? classes.grayText
                          : ''
                      }`}
                      name="cardInterestRateValue"
                    >
                      {typeof data.interest !== 'number'
                        ? data.interest
                        : data.interest.toFixed(2)}
                      %
                    </Typography>
                  </div>
                  <div className={classes.dataItem}>
                    <Typography
                      className={classes.dataTitle}
                      name="cardInterestPaidTitle"
                    >
                      Interest paid{' '}
                      <Tooltip
                        title="This is how much interest you'll have paid, by the time you've paid off this account"
                        placement="top"
                      >
                        <span>
                          <Icon icon="info" className={classes.infoIcon} />
                        </span>
                      </Tooltip>
                    </Typography>
                    <Typography
                      className={classes.dataValue}
                      name="cardInterestPaidValue"
                    >
                      {data.payOffDate !== 'N/A'
                        ? numberWithCommas(data.interestPaid, true, 2)
                        : `${numberWithCommas(data.interestPaid, true)}+`}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      );
    } catch (e) {
      return <ErrorBoundary error={e} />;
    }
  }
);

export default DropTarget(
  'card',
  {
    hover(props, monitor, component) {
      const { index, moveCard } = props;
      if (!component) {
        return null;
      }
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return null;
      }
      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return null;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return null;
      }
      moveCard(dragIndex, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      monitor.getItem().index = hoverIndex;
      return null;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    'card',
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(CardItem)
);

CardItem.displayName = 'CardItem';

CardItem.defaultProps = {
  data: undefined,
  connectDragSource: undefined,
  connectDropTarget: undefined
};

CardItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    balance: PropTypes.number,
    payOffDate: PropTypes.string,
    interest: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    interestPaid: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func
};
