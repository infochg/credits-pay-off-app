import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Tooltip, Button, Fade } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import useWindowSize from '../../../utils/useWindowSize';
import useWindowScroll from '../../../utils/useWindowScroll';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '9002',
    width: '100%',
    height: '100%'
  },
  backdrop: {
    position: 'fixed',
    boxShadow:
      '0 0 0 9999px rgba(0, 0, 0, 0.4), inset 0 0 1px 1px rgba(0,0,0,0.06), inset 0 0 2px 2px rgba(0,0,0,0.06), inset 0 0 4px 4px rgba(0,0,0,0.06), inset 0 0 8px 8px rgba(0,0,0,0.06), inset 0 0 16px 16px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btns: {
    display: 'flex',
    alignItems: 'center'
  },
  skipBtn: {
    fontSize: '14px',
    color: '#4cd2fe',
    cursor: 'pointer',
    marginTop: '5px',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  btn: {
    fontSize: '23px',
    lineHeight: '23px',
    color: '#fff',
    background: theme.palette.primary.main,
    borderRadius: '20px',
    padding: '2px 21px',
    display: 'block',
    margin: '5px 0 0 auto',
    '&:hover': {
      background: '#CCE1F7'
    }
  },
  [theme.breakpoints.down('sm')]: {
    btn: {
      fontSize: '16px',
      lineHeight: '16px',
      padding: '5px 10px'
    }
  }
}));

const LightTooltip = withStyles(theme => ({
  tooltip: {
    background: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    padding: '15px 20px',
    margin: '20px',
    borderRadius: '30px',
    boxSizing: 'border-box',
    width: 'calc(100% - 40px)',
    maxWidth: '480px',
    fontSize: '25px'
  },
  popper: {
    zIndex: '9003',
    pointerEvents: 'auto'
  },
  [theme.breakpoints.down('sm')]: {
    tooltip: {
      fontSize: '16px',
      padding: '10px',
      borderRadius: '20px'
    }
  }
}))(Tooltip);

function Walkthrough(props) {
  const { data, onFinish } = props;
  const classes = useStyles();
  const [curStepId, setCurStepId] = useState(1);
  const [isOpened, setIsOpened] = useState(false);

  useWindowSize();
  useWindowScroll();

  useEffect(() => {
    setTimeout(() => setIsOpened(true), 200);
  }, [curStepId]);

  let curStepEl;
  let curStepElSizes;
  if (data && data.length > 0) {
    curStepEl = data.find(item => item.id === curStepId);
    if (curStepEl && curStepEl.nodeEl && curStepEl.nodeEl.current) {
      curStepElSizes = curStepEl.nodeEl.current.getBoundingClientRect();
    }
  }

  try {
    const finishWalk = () => {
      setCurStepId(0);
      onFinish({ registration: 'done' });
    };

    const nextStep = () => {
      setIsOpened(false);

      setTimeout(() => {
        const nextStepEl = data.find(item => item.id === curStepId + 1);

        if (nextStepEl) {
          setCurStepId(curStepId + 1);

          let scrollVal = nextStepEl.nodeEl.current.offsetTop;
          if (nextStepEl.nodeEl && nextStepEl.nodeEl.current) {
            scrollVal = nextStepEl.nodeEl.current.offsetTop - 100;
          }
          if (nextStepEl.scrollLess) {
            scrollVal -= nextStepEl.scrollLess;
          }

          if (nextStepEl.scroll) {
            window.scrollTo({
              top: scrollVal,
              behavior: 'smooth'
            });
          }
        } else {
          finishWalk();
        }
      }, 200);
    };

    return (
      <React.Fragment>
        {curStepEl && curStepElSizes ? (
          <React.Fragment>
            <div className={classes.wrapper}>
              <LightTooltip
                title={
                  <React.Fragment>
                    {curStepEl.text}
                    <div className={classes.btns}>
                      <div
                        className={classes.skipBtn}
                        role="presentation"
                        onClick={finishWalk}
                      >
                        Skip Tutorial
                      </div>
                      <Button onClick={nextStep} className={classes.btn}>
                        OK
                      </Button>
                    </div>
                  </React.Fragment>
                }
                open={isOpened}
                TransitionComponent={Fade}
              >
                <div
                  className={classes.backdrop}
                  id="walkBlock"
                  style={{
                    top: curStepElSizes.top - 10,
                    left: curStepElSizes.left - 10,
                    width: curStepElSizes.width + 20,
                    height: curStepElSizes.height + 20
                  }}
                />
              </LightTooltip>
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Walkthrough.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onFinish: PropTypes.func
};

Walkthrough.defaultProps = {
  data: undefined,
  onFinish: undefined
};

export default Walkthrough;
