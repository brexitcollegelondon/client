import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import GREEN from '@material-ui/core/colors/green';

import { selectCreate, selectUserInfo } from '../reduxStore/selectors';
import CreateChallengeForm from './CreateChallengeForm'
import {setAllChallenges} from "../challenges/reducer";
import * as PropTypes from "prop-types";
import { SERVER_ENDPOINT } from "../urlEndpoints";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class ChallengeDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getAllChallenges = () => {
      const {dispatch} = this.props;
      axios.get(`${SERVER_ENDPOINT}/challenges`)
          .then(function (response) {
              // list of challenge objects returned
              const res = response.data;
              dispatch(setAllChallenges(res));
          })
          .catch(function (error) {
              // handle error
              console.error(error);
          });
  };

  handleCreate = () => {
    const { create, user_info } = this.props;
    // HARD CODE CHALLENGE:
    axios.post(`${SERVER_ENDPOINT}/challenge`, {
        challenge_id: "1",
        creator_id: user_info.user_id,
        creator_bystander: false,
        duration: 20,
        start_time: "2019-03-31T00:05:32.000Z", // datetimestring
        pledge_amount: 15, // in DCT
        bystanders: [],
        participants: [user_info.user_id],
        challenge_type: create.challenge_type,
        target_quantity: 20, // 20 steps for this challenge
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(this.getAllChallenges);
    this.setState({ open: false });
  };

  render() {
    return (
      <Grid container spacing={24}>
			  <Button style={{ backgroundColor: GREEN["500"], color: "white"}} variant="contained" aria-label="create" size='large'onClick={this.handleClickOpen}>
          <AddIcon />
          <Typography color='inherit' variant="h5" component="h3">
            Create Challenge
          </Typography>
	      </Button>
        <Dialog
          maxWidth='md'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container alignItems='center' spacing={16}>
            <Grid item xs={12}>
              <DialogTitle id="form-dialog-title">
                <h2 style={{textAlign: 'center'}}>Create a new challenge</h2>
              </DialogTitle>
            </Grid>
            <Grid item xs={12}>
              <CreateChallengeForm />
            </Grid>
          </Grid>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button size='large' onClick={this.handleClose} color="primary">
              <span style={{fontSize: "1.4rem"}}>Cancel</span>
            </Button>
            <Button size='large' onClick={this.handleCreate} color="primary">
              <span style={{fontSize: "1.4rem"}}>Create</span>
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

ChallengeDialog.propTypes = {
    create: PropTypes.any,
    user_info: PropTypes.any,
};

function mapStateToProps(state) {
	return {
		create: selectCreate(state),
        user_info: selectUserInfo(state),
	};
}

export default connect(mapStateToProps)(ChallengeDialog)
