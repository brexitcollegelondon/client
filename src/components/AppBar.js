import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GREEN from '@material-ui/core/colors/green';

import LoginTextField from './LoginTextField'
import { selectUserInfo } from "../reduxStore/selectors";
import { connect } from "react-redux";

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
  const { classes, isLoggedIn, userId } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ padding: '0.8rem 2rem', backgroundColor: GREEN["500"] }}>
        <Toolbar>
          <Typography variant="h2" color="inherit" className={classes.grow}>
            Decent Life
          </Typography>
          {isLoggedIn ? <span style={{fontSize: '1.8rem'}}>Hello {userId.charAt(0).toUpperCase()}{userId.slice(1)}!</span> : <LoginTextField/>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

DecentLifeAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {isLoggedIn: selectUserInfo(state).is_logged_in, userId: selectUserInfo(state).user_id};
}

export default withStyles(styles)(connect(mapStateToProps)(DecentLifeAppBar));
