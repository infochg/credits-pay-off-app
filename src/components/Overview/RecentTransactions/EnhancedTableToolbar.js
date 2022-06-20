import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, Tooltip } from '@material-ui/core';
import Icon from '../../Common/Icon';
// import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    minHeight: '0'
  },
  highlight: {
    color: theme.palette.text.primary,
    backgroundColor: '#ffffff',
    minHeight: '64px',
    borderRadius: '5px'
  },
  title: {
    flex: '1 1 100%'
  },
  deleteIcon: {
    height: '25px',
    marginRight: '10px',
    cursor: 'pointer'
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={`${classes.root} ${numSelected > 0 ? classes.highlight : ''}`}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <span>
            <Icon icon="trash" className={classes.deleteIcon} />
          </span>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};
export default EnhancedTableToolbar;
