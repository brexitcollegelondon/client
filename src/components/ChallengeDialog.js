import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import { selectCreate, selectUserInfo } from '../reduxStore/selectors';
import CreateChallengeForm from './CreateChallengeForm'
import {setAllChallenges} from "../challenges/reducer";
import * as PropTypes from "prop-types";

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
      axios.get('http://127.0.0.1:5000/challenges')
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
    axios.post('http://127.0.0.1:5000/challenge', {
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
			  <Button color="primary" variant="contained" aria-label="create" size='large'onClick={this.handleClickOpen}>
          <AddIcon />
          <Typography color='inherit' variant="h5" component="h3">
            Create Challenge
          </Typography>
	      </Button>
        <Dialog
          maxWidth='xs'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container alignItems='center' spacing={16}>
            <Grid item xs={12}>
              <DialogTitle id="form-dialog-title">Create a new challenge</DialogTitle>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>
              Create a new challenge to try and gain your friend's Decent!
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <CreateChallengeForm />
            </Grid>
          </Grid>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button size='large' onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button size='large' onClick={this.handleCreate} color="primary">
              Create
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
