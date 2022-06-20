import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// import Icon from '../../Common/Icon';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { numberWithCommas } from '../../../utils/helpers';

const useStyles = makeStyles(theme => ({
  cardWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: '5px',
    padding: '20px 10px',
    margin: '10px 0'
  },
  image: {
    width: '145px',
    height: '52px',
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  rightBlock: {
    margin: '0 0 0 auto',
    display: 'flex',
    alignItems: 'center'
  },
  balanceWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: '16px',
    color: theme.palette.text.secondary
  },
  amount: {
    fontSize: '22px',
    width: '150px',
    textAlign: 'right'
  },
  // cardTopDots: {
  //   margin: '-5px 10px 0 10px',
  //   color: '#a6b1bf',
  //   minWidth: '28px',
  //   maxWidth: '28px',
  //   height: '28px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   background: 'transparent',
  //   borderRadius: '3px',
  //   transition: 'all 0.3s',
  //   cursor: 'pointer',
  //   '& svg': {
  //     display: 'block',
  //     width: '25px'
  //   },
  //   '&:hover': {
  //     background: '#EEF2F5'
  //   }
  // },
  // popoverContent: {
  //   padding: '5px 20px'
  // },
  // popoverItem: {
  //   padding: '5px 0',
  //   fontSize: '16px',
  //   color: theme.palette.text.primary,
  //   textDecoration: 'none',
  //   cursor: 'pointer',
  //   transition: 'all 0.3s',
  //   '& a': {
  //     color: theme.palette.text.primary,
  //     textDecoration: 'none',
  //     transition: 'all 0.3s',
  //     '&:hover': {
  //       color: theme.palette.primary.main
  //     }
  //   },
  //   '&:hover': {
  //     color: theme.palette.primary.main
  //   }
  // },
  [theme.breakpoints.down('xs')]: {
    cardWrapper: {
      position: 'relative',
      display: 'block',
      padding: '20px 10px 10px 10px'
    },
    rightBlock: {
      paddingTop: '10px',
      display: 'block'
    },
    // cardTopDots: {
    //   position: 'absolute',
    //   top: '35px',
    //   right: '0'
    // },
    balanceWrapper: {
      justifyContent: 'flex-start',
      flexWrap: 'nowrap'
    },
    amount: {
      margin: '0 0 0 auto'
    }
  }
}));

function AccountItem(props) {
  const { data } = props;
  const classes = useStyles();
  // const [popoverEl, setPopoverEl] = useState(null);
  try {
    // const openPopover = event => {
    //   setPopoverEl(event.currentTarget);
    // };
    // const closePopover = () => {
    //   setPopoverEl(null);
    // };
    // const isPopoverOpen = Boolean(popoverEl);
    //
    // const removeCard = () => {
    //   return null;
    // };

    return (
      <div className={classes.cardWrapper}>
        <div className={classes.image}>
          <img src={data.image} alt={data.name || ''} />
        </div>
        <div className={classes.rightBlock}>
          <div className={classes.balanceWrapper}>
            <Typography className={classes.text}>Balance</Typography>
            <Typography className={classes.amount}>
              {data.amount || data.amount === 0
                ? numberWithCommas(data.amount, true, 2)
                : 'N/A'}
            </Typography>
          </div>
          {/* <div
            role="presentation"
            className={classes.cardTopDots}
            onClick={openPopover}
          >
            <Icon icon="menu" />
          </div> */}
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
            <Typography className={classes.popoverItem} onClick={removeCard}>
              Remove
            </Typography>
          </div>
        </Popover> */}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

AccountItem.defaultProps = {
  data: undefined
};

AccountItem.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.node,
    name: PropTypes.string,
    amount: PropTypes.number
  })
};

export default AccountItem;
