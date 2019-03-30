import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
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
	let loginStatus;
	if (true) {
		loginStatus = <LoginTextField/>
	} else {
		loginStatus = <Avatar>T</Avatar>
	}
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" color="inherit" className={classes.grow}>
            Decent Life
          </Typography>
					{loginStatus}
        </Toolbar>
      </AppBar>
    </div>
  );
}

DecentLifeAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DecentLifeAppBar);
