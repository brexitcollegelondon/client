import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import LoginTextField from './LoginTextField'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function DecentLifeAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ paddingTop: '0.8rem', paddingBottom: '0.8rem' }}>
        <Toolbar>
          <Typography variant="h2" color="inherit" className={classes.grow}>
            Decent Life
          </Typography>
          <LoginTextField/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

DecentLifeAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DecentLifeAppBar);
